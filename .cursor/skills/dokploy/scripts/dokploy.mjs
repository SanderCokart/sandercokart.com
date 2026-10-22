#!/usr/bin/env node
/**
 * Compact Dokploy status, logs and deploys for the sanders-codehouse project.
 * One command instead of a chain of MCP schema lookups and large JSON payloads.
 *
 *   node .cursor/skills/dokploy/scripts/dokploy.mjs status [production|staging]
 *   node .cursor/skills/dokploy/scripts/dokploy.mjs logs <app> [env] [--tail 80] [--errors]
 *   node .cursor/skills/dokploy/scripts/dokploy.mjs deploy <app> [env] [--wait]
 *
 * <app> is the Dokploy app name: main, codehouse, api, api-queue, mail-renderer.
 * env defaults to production. --errors keeps only error lines plus context.
 * --wait polls until the deployment finishes, then prints the log tail on failure.
 *
 * Requires DOKPLOY_URL and DOKPLOY_API_KEY (exported in ~/.bashrc).
 */
const PROJECT_ID = 'zYsntENS-3FfU73fs6OYe';
const ERROR_PATTERN = /error|failed|fatal|exit code|✗|❌|ERR!|cannot|not found/i;

function usage(message) {
  if (message) console.error(message);
  console.error(
    'Usage: dokploy.mjs status [env] | logs <app> [env] [--tail N] [--errors] | deploy <app> [env] [--wait]',
  );
  process.exit(1);
}

function config() {
  const url = process.env.DOKPLOY_URL?.replace(/\/$/, '');
  const apiKey = process.env.DOKPLOY_API_KEY;
  if (!url || !apiKey) {
    console.error('Set DOKPLOY_URL and DOKPLOY_API_KEY (for example in ~/.bashrc).');
    process.exit(1);
  }
  return { url, apiKey };
}

async function call(method, pathname, params = {}) {
  const { url, apiKey } = config();
  const target = new URL(`/api/${pathname}`, `${url}/`);
  const init = { method, headers: { 'accept': 'application/json', 'x-api-key': apiKey } };
  if (method === 'GET') {
    for (const [key, value] of Object.entries(params)) target.searchParams.set(key, String(value));
  } else {
    init.headers['content-type'] = 'application/json';
    init.body = JSON.stringify(params);
  }
  const response = await fetch(target, init);
  const text = await response.text();
  if (!response.ok) throw new Error(`Dokploy ${pathname} failed (${response.status}): ${text.slice(0, 300)}`);
  try {
    const body = JSON.parse(text);
    return body?.data ?? body;
  } catch {
    return text;
  }
}

async function environments() {
  const project = await call('GET', 'project.one', { projectId: PROJECT_ID });
  return project.environments;
}

async function findApp(name, envName) {
  const env = (await environments()).find(e => e.name === envName);
  if (!env) usage(`unknown env ${envName}`);
  const app = (env.applications ?? []).find(a => a.name === name);
  if (!app) {
    usage(`unknown app ${name}; ${envName} has: ${env.applications.map(a => a.name).join(', ')}`);
  }
  return app;
}

async function deployments(applicationId) {
  const list = await call('GET', 'deployment.all', { applicationId });
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

const title = d => (d.title ?? '').split('\n')[0].slice(0, 60);

function age(date) {
  if (!date) return '—';
  const minutes = Math.round((Date.now() - new Date(date)) / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 60 * 48) return `${Math.round(minutes / 60)}h ago`;
  return `${Math.round(minutes / 1440)}d ago`;
}

function duration(d) {
  if (!d.startedAt || !d.finishedAt) return '';
  return `${Math.round((new Date(d.finishedAt) - new Date(d.startedAt)) / 1000)}s`;
}

function filterErrors(log) {
  const lines = log.split('\n');
  const keep = new Set();
  lines.forEach((line, i) => {
    if (ERROR_PATTERN.test(line)) for (let j = i - 2; j <= i + 2; j++) keep.add(j);
  });
  const out = [...keep].filter(i => i >= 0 && i < lines.length).sort((a, b) => a - b);
  return out.length ? out.map(i => lines[i]).join('\n') : '(no error lines matched)';
}

async function readLog(deploymentId, tail) {
  const log = await call('GET', 'deployment.readLogs', { deploymentId, tail });
  return typeof log === 'string' ? log : JSON.stringify(log);
}

function flag(args, name, fallback) {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
}

const [command, ...args] = process.argv.slice(2);
const positional = args.filter((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--tail'));

switch (command) {
  case 'status': {
    const only = positional[0];
    for (const env of await environments()) {
      if (only && env.name !== only) continue;
      console.log(env.name);
      for (const app of env.applications ?? []) {
        const [last] = await deployments(app.applicationId);
        const lastText = last
          ? `${last.status} ${age(last.createdAt)} ${duration(last)} "${title(last)}"`
          : 'no deployments';
        console.log(`  ${app.name.padEnd(14)} ${app.applicationStatus.padEnd(8)} ${lastText}`);
      }
    }
    break;
  }
  case 'logs': {
    const [name, envName = 'production'] = positional;
    if (!name) usage('logs needs an app');
    const app = await findApp(name, envName);
    const [last] = await deployments(app.applicationId);
    if (!last) usage('no deployments');
    const tail = Number(flag(args, '--tail', args.includes('--errors') ? 2000 : 80));
    console.log(`${name} ${envName}: ${last.status} ${age(last.createdAt)} "${title(last)}"`);
    if (last.errorMessage) console.log(`errorMessage: ${last.errorMessage}`);
    const log = await readLog(last.deploymentId, tail);
    console.log(args.includes('--errors') ? filterErrors(log) : log);
    break;
  }
  case 'deploy': {
    const [name, envName = 'production'] = positional;
    if (!name) usage('deploy needs an app');
    const app = await findApp(name, envName);
    const before = (await deployments(app.applicationId))[0]?.deploymentId;
    await call('POST', 'application.deploy', { applicationId: app.applicationId });
    console.log(`queued ${name} ${envName}`);
    if (!args.includes('--wait')) break;
    const deadline = Date.now() + 20 * 60000;
    while (Date.now() < deadline) {
      await new Promise(resolve => setTimeout(resolve, 15000));
      const [last] = await deployments(app.applicationId);
      if (!last || last.deploymentId === before || last.status === 'running') continue;
      console.log(`${last.status} ${duration(last)}`);
      if (last.status === 'error') console.log(filterErrors(await readLog(last.deploymentId, 2000)));
      process.exit(last.status === 'error' ? 1 : 0);
    }
    console.log('still running after 20m; check with: node .cursor/skills/dokploy/scripts/dokploy.mjs logs ' + name + ' ' + envName);
    break;
  }
  default:
    usage();
}
