#!/usr/bin/env node
/**
 * Build the Dokploy apps locally with the exact environment Dokploy's Docker
 * build sees, so the Turbo remote cache gets the artifacts and the server
 * build replays them instead of rebuilding.
 *
 *   node scripts/turbo-prebuild.mjs staging      (pre-push to development)
 *   node scripts/turbo-prebuild.mjs production   (pre-push to main)
 *   node scripts/turbo-prebuild.mjs pre-push     (husky: reads pushed refs on stdin)
 *
 * Dokploy builds from the Dockerfile with no build args; the only variables in
 * the build are the build secrets (SENTRY_AUTH_TOKEN, TURBO_TOKEN, TURBO_TEAM)
 * and the Dockerfile's NEXT_OUTPUT=standalone. Every other variable is left
 * out here too, because Turbo hashes the env and any extra value is a miss.
 * SENTRY_AUTH_TOKEN is passThroughEnv (not hashed), so a staging build on
 * development has the same hash as the production build of the same tree.
 *
 * Secret values come from apps/<app>/.envx.<env> (decrypt needs
 * DOTENV_PRIVATE_KEY_<ENV> or .env.keys). Refresh them with
 * `node scripts/dokploy-env.mjs pull <env>`.
 * Skip with SKIP_TURBO_PREBUILD=1.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOTENVX = path.join(ROOT, 'node_modules', '.bin', 'dotenvx');
const KEYS_FILE = path.join(ROOT, '.env.keys');
const APPS = ['codehouse', 'main'];
const BUILD_SECRETS = ['SENTRY_AUTH_TOKEN', 'TURBO_TOKEN', 'TURBO_TEAM'];
const DOCKERFILE_ENV = { NEXT_OUTPUT: 'standalone' };
const BRANCH_ENV = { 'refs/heads/development': 'staging', 'refs/heads/main': 'production' };
const PASS = ['PATH', 'HOME', 'TERM', 'TMPDIR', 'LANG', 'PNPM_HOME', 'XDG_CACHE_HOME'];

const log = message => console.error(`[turbo-prebuild] ${message}`);

function git(...args) {
  const result = spawnSync('git', args, { cwd: ROOT, encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim() : '';
}

function decrypt(app, environment) {
  const file = path.join(ROOT, 'apps', app, `.envx.${environment}`);
  if (!existsSync(file)) return { error: `${path.relative(ROOT, file)} is missing` };
  const args = ['get', '-f', file, '--format', 'json'];
  if (existsSync(KEYS_FILE)) args.push('-fk', KEYS_FILE);
  const result = spawnSync(DOTENVX, args, { cwd: ROOT, encoding: 'utf8' });
  if (result.status !== 0)
    return {
      error: `could not decrypt ${path.relative(ROOT, file)} (set DOTENV_PRIVATE_KEY_${environment.toUpperCase()} or add .env.keys)`,
    };
  const values = JSON.parse(result.stdout);
  if (Object.values(values).some(v => typeof v === 'string' && v.startsWith('encrypted:'))) {
    return { error: `no key for ${path.relative(ROOT, file)} (set DOTENV_PRIVATE_KEY_${environment.toUpperCase()})` };
  }
  return { values };
}

function buildApp(app, environment) {
  const { values, error } = decrypt(app, environment);
  if (error) {
    log(`skip ${app}: ${error}`);
    return 'skipped';
  }
  const env = Object.fromEntries(PASS.filter(k => process.env[k]).map(k => [k, process.env[k]]));
  for (const key of BUILD_SECRETS) if (values[key]) env[key] = values[key];
  Object.assign(env, DOCKERFILE_ENV);
  if (!env.TURBO_TOKEN || !env.TURBO_TEAM) log(`${app}: TURBO_TOKEN/TURBO_TEAM missing, remote cache off`);

  log(`${app} (${environment}): turbo build --filter=${app}`);
  const result = spawnSync('pnpm', ['exec', 'turbo', 'run', 'build', `--filter=${app}`, '--output-logs=errors-only'], {
    cwd: ROOT,
    env,
    stdio: 'inherit',
  });
  return result.status === 0 ? 'ok' : 'failed';
}

function run(environment) {
  const results = APPS.map(app => [app, buildApp(app, environment)]);
  log(results.map(([app, r]) => `${app}: ${r}`).join(', '));
  if (results.some(([, r]) => r === 'failed')) {
    log('build failed; fix it or push with SKIP_TURBO_PREBUILD=1');
    process.exit(1);
  }
}

function prePush() {
  if (process.env.SKIP_TURBO_PREBUILD === '1') return log('SKIP_TURBO_PREBUILD=1, skipping');
  const head = git('rev-parse', 'HEAD');
  const targets = new Set();
  for (const line of readFileSync(0, 'utf8').split('\n')) {
    const [, localSha, remoteRef] = line.trim().split(/\s+/);
    if (!remoteRef || /^0+$/.test(localSha) || !BRANCH_ENV[remoteRef]) continue;
    if (localSha !== head) {
      log(`skip ${remoteRef}: pushing ${localSha.slice(0, 7)}, not the checked-out HEAD`);
      continue;
    }
    targets.add(BRANCH_ENV[remoteRef]);
  }
  if (!targets.size) return;
  if (git('status', '--porcelain')) {
    return log('skip: working tree has uncommitted or untracked files, so hashes would not match the pushed commit');
  }
  for (const environment of targets) run(environment);
}

const [mode] = process.argv.slice(2);
if (mode === 'pre-push') prePush();
else if (mode === 'staging' || mode === 'production') run(mode);
else {
  console.error('Usage: turbo-prebuild.mjs <staging|production|pre-push>');
  process.exit(2);
}
