#!/usr/bin/env node
/**
 * Sync encrypted .envx files from Dokploy (env + buildArgs + buildSecrets).
 *
 *   node scripts/dokploy-env.mjs check staging
 *   node scripts/dokploy-env.mjs pull staging
 *   node scripts/dokploy-env.mjs check staging --app codehouse
 *   node scripts/dokploy-env.mjs check staging --debug
 *
 * Requires DOKPLOY_URL and DOKPLOY_API_KEY. Optional: BAO_ADDR + bao login
 * to resolve ${{vault.…}} refs; otherwise those keys are skipped.
 * --debug logs steps to stderr; never prints secret values.
 *
 * Symlinked as .cursor/skills/dokploy/scripts/dokploy-env.mjs so the dokploy
 * skill ships it. On Windows (outside WSL), git checks symlinks out as plain
 * text files unless `git config core.symlinks true` is set (needs Developer
 * Mode or admin). If the skill's copy is a one-line path instead of code, tell
 * the developer to enable core.symlinks and re-checkout, or run this file directly.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOTENVX = path.join(ROOT, "node_modules", ".bin", "dotenvx");
const KEYS_FILE = path.join(ROOT, ".env.keys");
const PROJECT_NAME = "sanders-codehouse";

const APPS = [
  { name: "codehouse", dir: "apps/codehouse" },
  { name: "main", dir: "apps/main" },
  { name: "api", dir: "apps/api" },
];

const PUBLIC_KEY_RE = /^DOTENV_PUBLIC_KEY_[A-Z0-9_]+$/;
const VAULT_RE = /^vault\.([A-Za-z0-9_-]+)\.(.+):([^:]+)$/;
const REF_RE = /\$\{\{([^}]+)\}\}/g;

const state = { debug: false };

function debugLog(...args) {
  if (!state.debug) {
    return;
  }
  console.error("[debug]", ...args);
}

function usage(message) {
  if (message) {
    console.error(message);
  }
  console.error(
    "Usage: node scripts/dokploy-env.mjs <check|pull> <staging|production> [--app name] [--debug]",
  );
  process.exit(2);
}

function parseArgs(argv) {
  const rest = argv.slice(2);
  const action = rest[0];
  const environment = rest[1];
  if (action !== "check" && action !== "pull") {
    usage("Expected action check or pull.");
  }
  if (environment !== "staging" && environment !== "production") {
    usage("Expected environment staging or production.");
  }

  let appFilter = null;
  let debug = false;
  for (let i = 2; i < rest.length; i += 1) {
    if (rest[i] === "--app") {
      appFilter = rest[i + 1];
      i += 1;
    } else if (rest[i] === "--debug") {
      debug = true;
    } else {
      usage(`Unknown argument: ${rest[i]}`);
    }
  }

  const apps = appFilter
    ? APPS.filter((app) => app.name === appFilter)
    : APPS;
  if (apps.length === 0) {
    usage(`Unknown app "${appFilter}".`);
  }

  return { action, environment, apps, debug };
}

function requireDokployEnv() {
  const url = process.env.DOKPLOY_URL?.replace(/\/$/, "");
  const apiKey = process.env.DOKPLOY_API_KEY;
  if (!url || !apiKey) {
    console.error(
      "Set DOKPLOY_URL and DOKPLOY_API_KEY (for example in ~/.bashrc).",
    );
    process.exit(1);
  }
  return { url, apiKey };
}

async function dokployGet(pathname, query) {
  const { url, apiKey } = requireDokployEnv();
  const target = new URL(`/api/${pathname}`, `${url}/`);
  for (const [key, value] of Object.entries(query)) {
    target.searchParams.set(key, String(value));
  }

  debugLog(`GET ${target.pathname}${target.search}`);
  const response = await fetch(target, {
    headers: {
      accept: "application/json",
      "x-api-key": apiKey,
    },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      `Dokploy ${pathname} failed (${response.status}): ${JSON.stringify(body)}`,
    );
  }
  debugLog(`${pathname} ${response.status}`);
  return body?.data ?? body;
}

function parseDotenv(text) {
  const map = new Map();
  if (!text) {
    return map;
  }

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }
    const eq = line.indexOf("=");
    if (eq === -1) {
      continue;
    }
    const key = line.slice(0, eq).trim();
    if (!key || PUBLIC_KEY_RE.test(key)) {
      continue;
    }
    map.set(key, unquote(line.slice(eq + 1).trim()));
  }

  return map;
}

function unquote(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function quote(value) {
  if (value === "") {
    return "";
  }
  if (/^[A-Za-z0-9_./:@+-]+$/.test(value)) {
    return value;
  }
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function serializeDotenv(map, publicKeyLine) {
  const lines = [];
  if (publicKeyLine) {
    lines.push(publicKeyLine, "");
  }
  for (const [key, value] of map) {
    lines.push(`${key}=${quote(value)}`);
  }
  return `${lines.join("\n")}\n`;
}

function mergeDotenv(chunks) {
  const map = new Map();
  const sources = new Map();
  for (const [source, chunk] of chunks) {
    const keys = [];
    for (const [key, value] of parseDotenv(chunk)) {
      map.set(key, value);
      sources.set(key, source);
      keys.push(key);
    }
    debugLog(`${source}: ${keys.length} keys${keys.length ? ` (${keys.join(", ")})` : ""}`);
  }
  return { map, sources };
}

function refsIn(value) {
  return [...String(value).matchAll(REF_RE)].map((match) => match[0]);
}

function lookup(map, key) {
  return map instanceof Map ? map.get(key) : map[key];
}

function interpolateValue(value, scopes, vaultCache, unresolved, depth = 0) {
  if (typeof value !== "string" || depth > 8 || !value.includes("${{")) {
    return value;
  }

  return value.replace(REF_RE, (match, inner) => {
    const ref = inner.trim();
    if (ref.startsWith("project.")) {
      const key = ref.slice("project.".length);
      const next = lookup(scopes.project, key);
      if (next === undefined) {
        unresolved.add(`${match}`);
        return match;
      }
      return interpolateValue(next, scopes, vaultCache, unresolved, depth + 1);
    }
    if (ref.startsWith("environment.")) {
      const key = ref.slice("environment.".length);
      const next = lookup(scopes.environment, key);
      if (next === undefined) {
        unresolved.add(`${match}`);
        return match;
      }
      return interpolateValue(next, scopes, vaultCache, unresolved, depth + 1);
    }
    if (ref.startsWith("vault.")) {
      const resolved = resolveVault(ref, vaultCache, unresolved);
      return resolved === undefined ? match : resolved;
    }
    const next = lookup(scopes.self, ref);
    if (next === undefined) {
      unresolved.add(`${match}`);
      return match;
    }
    return interpolateValue(next, scopes, vaultCache, unresolved, depth + 1);
  });
}

function interpolateMap(map, scopes, vaultCache, sources) {
  const unresolvedVault = [];
  const resolved = new Map();

  for (const [key, raw] of map) {
    const unresolved = new Set();
    const value = interpolateValue(
      raw,
      { ...scopes, self: map },
      vaultCache,
      unresolved,
    );
    const leftover = [...unresolved].filter((item) => item.includes("vault."));
    const refs = refsIn(raw);
    if (leftover.length > 0 || /\$\{\{vault\./.test(value)) {
      unresolvedVault.push(key);
      debugLog(
        `${key}: skip (${sources.get(key) ?? "unknown"})${refs.length ? ` ${refs.join(" → ")}` : ""} unresolved=${[...unresolved].join(", ") || "vault leftover"}`,
      );
      continue;
    }
    resolved.set(key, value);
    debugLog(
      `${key}: ok (${sources.get(key) ?? "unknown"}, ${value.length} chars)${refs.length ? ` ${refs.join(" → ")}` : ""}`,
    );
  }

  return { resolved, unresolvedVault };
}

function resolveVault(ref, cache, unresolved) {
  const match = VAULT_RE.exec(ref);
  if (!match) {
    unresolved.add(`\${{${ref}}}`);
    return undefined;
  }
  const [, , kvPath, field] = match;
  const cacheKey = `${kvPath}:${field}`;
  if (cache.has(cacheKey)) {
    debugLog(`vault ${cacheKey}: cache`);
    return cache.get(cacheKey);
  }

  debugLog(`vault ${cacheKey}: bao kv get`);
  const result = spawnSync(
    "mise",
    [
      "exec",
      "openbao@latest",
      "--",
      "bao",
      "kv",
      "get",
      "-mount=secret",
      `-field=${field}`,
      kvPath,
    ],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        BAO_ADDR: process.env.BAO_ADDR ?? "https://secrets.sandercokart.com",
      },
    },
  );

  if (result.status !== 0) {
    cache.set(cacheKey, undefined);
    unresolved.add(`\${{${ref}}}`);
    const err = (result.stderr || result.stdout || "").trim().split("\n")[0];
    debugLog(`vault ${cacheKey}: fail exit=${result.status}${err ? ` ${err}` : ""}`);
    return undefined;
  }

  const value = result.stdout.replace(/\n$/, "");
  cache.set(cacheKey, value);
  debugLog(`vault ${cacheKey}: ok (${value.length} chars)`);
  return value;
}

function envxPath(appDir, environment) {
  return path.join(ROOT, appDir, `.envx.${environment}`);
}

function runDotenvx(args, extraEnv = {}) {
  const result = spawnSync(DOTENVX, args, {
    cwd: ROOT,
    encoding: "utf8",
    env: { ...process.env, ...extraEnv },
  });
  if (result.status !== 0) {
    throw new Error(
      `dotenvx ${args.join(" ")} failed:\n${result.stderr || result.stdout}`,
    );
  }
  return result.stdout;
}

function decryptLocal(filePath, environment) {
  if (!existsSync(filePath)) {
    return null;
  }
  const args = [
    "decrypt",
    "-f",
    filePath,
    "--stdout",
    "--no-native",
    "--no-armor",
  ];
  if (existsSync(KEYS_FILE)) {
    args.push("-fk", KEYS_FILE);
  }
  try {
    return parseDotenv(runDotenvx(args));
  } catch (error) {
    const keyName = `DOTENV_PRIVATE_KEY_${environment.toUpperCase()}`;
    throw new Error(
      `Could not decrypt ${path.relative(ROOT, filePath)}. Set ${keyName} or provide ${path.relative(ROOT, KEYS_FILE)}.\n${error.message}`,
    );
  }
}

function readPublicKeyLine(filePath) {
  if (!existsSync(filePath)) {
    return null;
  }
  const line = readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .find((candidate) => candidate.startsWith("DOTENV_PUBLIC_KEY_"));
  return line ?? null;
}

function readPrivateKey(environment) {
  const keyName = `DOTENV_PRIVATE_KEY_${environment.toUpperCase()}`;
  if (process.env[keyName]) {
    return process.env[keyName];
  }
  if (!existsSync(KEYS_FILE)) {
    return null;
  }
  return parseDotenv(readFileSync(KEYS_FILE, "utf8")).get(keyName) ?? null;
}

function diffMaps(local, remote) {
  const added = [];
  const removed = [];
  const changed = [];
  const localKeys = new Set(local ? local.keys() : []);
  const remoteKeys = new Set(remote.keys());

  for (const key of [...remoteKeys].sort()) {
    if (!localKeys.has(key)) {
      added.push(key);
    } else if (local.get(key) !== remote.get(key)) {
      changed.push(key);
    }
  }
  if (local) {
    for (const key of [...localKeys].sort()) {
      if (!remoteKeys.has(key)) {
        removed.push(key);
      }
    }
  }
  return { added, removed, changed };
}

function printDiff(relPath, diff, missing) {
  console.log(relPath);
  if (missing) {
    console.log("  (missing local file)");
  }
  for (const key of diff.added) {
    console.log(`  + ${key}`);
  }
  for (const key of diff.removed) {
    console.log(`  - ${key}`);
  }
  for (const key of diff.changed) {
    console.log(`  ~ ${key}`);
  }
  if (
    !missing &&
    diff.added.length === 0 &&
    diff.removed.length === 0 &&
    diff.changed.length === 0
  ) {
    console.log("  ok");
  }
}

async function loadRemote(environment, apps) {
  const projects = await dokployGet("project.search", {
    name: PROJECT_NAME,
    limit: 20,
  });
  const project = (projects.items ?? projects).find(
    (item) => item.name === PROJECT_NAME,
  );
  if (!project) {
    throw new Error(`Dokploy project "${PROJECT_NAME}" not found.`);
  }

  const environments = await dokployGet("environment.search", {
    projectId: project.projectId,
    name: environment,
    limit: 20,
  });
  const env = (environments.items ?? environments).find(
    (item) => item.name === environment,
  );
  if (!env) {
    throw new Error(
      `Dokploy environment "${environment}" not found in ${PROJECT_NAME}.`,
    );
  }

  const details = await dokployGet("environment.one", {
    environmentId: env.environmentId,
  });
  debugLog(`project ${project.name} (${project.projectId})`);
  debugLog(`environment ${env.name} (${env.environmentId})`);
  const projectEnv = parseDotenv(details.project?.env ?? project.env ?? "");
  const environmentEnv = parseDotenv(details.env ?? env.env ?? "");
  debugLog(`project env keys: ${[...projectEnv.keys()].join(", ") || "(none)"}`);
  debugLog(
    `environment env keys: ${[...environmentEnv.keys()].join(", ") || "(none)"}`,
  );
  const vaultCache = new Map();
  const results = [];

  for (const app of apps) {
    const application = (details.applications ?? []).find(
      (item) => item.name === app.name,
    );
    if (!application) {
      throw new Error(
        `Dokploy application "${app.name}" not found in ${PROJECT_NAME}/${environment}.`,
      );
    }

    const one = await dokployGet("application.one", {
      applicationId: application.applicationId,
    });
    debugLog(
      `app ${app.name} (${application.applicationId}) env/buildArgs/buildSecrets`,
    );
    const { map: merged, sources } = mergeDotenv([
      ["env", one.env],
      ["buildArgs", one.buildArgs],
      ["buildSecrets", one.buildSecrets],
    ]);
    const { resolved, unresolvedVault } = interpolateMap(
      merged,
      { project: projectEnv, environment: environmentEnv },
      vaultCache,
      sources,
    );

    results.push({
      app,
      remote: resolved,
      unresolvedVault,
    });
  }

  return results;
}

function encryptFile(filePath, environment, publicKeyLine) {
  const args = ["encrypt", "-f", filePath, "--no-native", "--no-armor"];
  mkdirSync(path.dirname(KEYS_FILE), { recursive: true });
  args.push("-fk", KEYS_FILE);
  const extraEnv = {};
  const privateKey = readPrivateKey(environment);
  if (privateKey) {
    extraEnv[`DOTENV_PRIVATE_KEY_${environment.toUpperCase()}`] = privateKey;
  }
  if (publicKeyLine && !readFileSync(filePath, "utf8").includes("DOTENV_PUBLIC_KEY_")) {
    writeFileSync(
      filePath,
      `${publicKeyLine}\n\n${readFileSync(filePath, "utf8")}`,
    );
  }
  runDotenvx(args, extraEnv);
}

function logAuth() {
  const { url } = requireDokployEnv();
  debugLog(`DOKPLOY_URL=${url}`);
  debugLog(`DOKPLOY_API_KEY=${process.env.DOKPLOY_API_KEY ? "set" : "missing"}`);
  debugLog(
    `BAO_ADDR=${process.env.BAO_ADDR ?? "https://secrets.sandercokart.com (default)"}`,
  );
  debugLog(`BAO_TOKEN=${process.env.BAO_TOKEN ? "set" : "missing"}`);
  debugLog(
    `~/.vault-token=${existsSync(path.join(homedir(), ".vault-token")) ? "present" : "missing"}`,
  );
}

async function main() {
  const { action, environment, apps, debug } = parseArgs(process.argv);
  state.debug = debug;
  logAuth();
  debugLog(`action=${action} environment=${environment} apps=${apps.map((app) => app.name).join(",")}`);
  const loaded = await loadRemote(environment, apps);
  let drifted = false;
  let publicKeyLine = null;

  for (const { app } of loaded) {
    publicKeyLine =
      publicKeyLine ?? readPublicKeyLine(envxPath(app.dir, environment));
  }

  for (const { app, remote, unresolvedVault } of loaded) {
    const filePath = envxPath(app.dir, environment);
    const relPath = path.relative(ROOT, filePath);
    debugLog(`decrypt ${relPath} ${existsSync(filePath) ? "exists" : "missing"}`);
    const local = decryptLocal(filePath, environment);
    debugLog(
      `local ${local ? `${local.size} keys` : "none"} remote ${remote.size} keys`,
    );
    const diff = diffMaps(local, remote);

    if (unresolvedVault.length > 0) {
      console.error(
        `${relPath}: skipped vault keys (log in to OpenBao to resolve): ${unresolvedVault.join(", ")}`,
      );
    }

    if (action === "check") {
      const missing = local === null;
      if (
        missing ||
        diff.added.length ||
        diff.removed.length ||
        diff.changed.length
      ) {
        drifted = true;
      }
      printDiff(relPath, diff, missing);
      continue;
    }

    writeFileSync(filePath, serializeDotenv(remote, null));
    encryptFile(filePath, environment, publicKeyLine);
    publicKeyLine = readPublicKeyLine(filePath) ?? publicKeyLine;
    console.log(`updated ${relPath}`);
  }

  if (action === "pull") {
    const keyName = `DOTENV_PRIVATE_KEY_${environment.toUpperCase()}`;
    if (!process.env[keyName] && existsSync(KEYS_FILE)) {
      console.error(
        `Wrote ${path.relative(ROOT, KEYS_FILE)} (gitignored). Export ${keyName} from it so decrypt works in new shells.`,
      );
    }
  }

  if (action === "check" && drifted) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
