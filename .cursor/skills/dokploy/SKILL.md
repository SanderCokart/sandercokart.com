---
name: dokploy
description: >-
  Operates Dokploy for this monorepo: deploy status, deploy logs, deploys,
  service env and `${{vault.}}` references. Use when deploying, debugging a
  failed build, or syncing env files. OpenBao KV CLI is the secrets skill.
---

# Dokploy

Run the scripts in [`scripts/`](scripts/) from the repo root. They need `DOKPLOY_URL` and `DOKPLOY_API_KEY` (exported in `~/.bashrc`) and resolve app IDs themselves.

## Scripts first

| Task | Command |
| --- | --- |
| Status of every app + last deploy | `node .cursor/skills/dokploy/scripts/dokploy.mjs status [production\|staging]` |
| Why did a deploy fail | `node .cursor/skills/dokploy/scripts/dokploy.mjs logs <app> [env] --errors` |
| Last lines of a deploy log | `node .cursor/skills/dokploy/scripts/dokploy.mjs logs <app> [env] --tail 80` |
| Deploy and wait for the result | `node .cursor/skills/dokploy/scripts/dokploy.mjs deploy <app> [env] --wait` |
| Compare / pull env into `.envx.<env>` | `pnpm env:staging:check` / `pnpm env:staging:pull` ([`scripts/dokploy-env.mjs`](scripts/dokploy-env.mjs), symlink to the root `scripts/` copy) |

`scripts/dokploy-env.mjs` here is a symlink. On native Windows without `git config core.symlinks true` it checks out as a one-line text path — if so, tell the developer to enable `core.symlinks` (Developer Mode or admin) and re-checkout, and run the root `scripts/dokploy-env.mjs` meanwhile.

`<app>`: `main`, `codehouse`, `api`, `api-queue`, `mail-renderer`. `env` defaults to `production`.

Rules:

- Deploy one app at a time — the host has 8 GB and parallel builds get OOM-killed.
- Deploying is outward-facing: confirm with the user first, and never deploy production from `development`.
- Slow build or cache misses: see [turbo-cache](../turbo-cache/SKILL.md).
- Do not `sleep`-poll; `deploy --wait` blocks until done and prints only the errors on failure.

## MCP and SSH

Use `user-dokploy-mcp` only for what the scripts don't cover: saving env (`application-saveEnvironment` / `compose-saveEnvironment`, dotenv **string**), domains, compose services. Fetch a tool's schema once per session. Don't call `application-one` for status — its payload is large; use `status`.

SSH to the VPS is a last resort (host-level issues, mail server). OpenBao CLI runs locally over HTTPS, not over SSH.

## Vault references

Shape: `${{vault.<provider>.<path>:<field>}}`, e.g. `DB_PASSWORD=${{vault.secrets.sandercokart/myapp:DB_PASSWORD}}`.

- `<provider>` is the name in Settings → Secrets (`secrets`), not the hostname. `<path>` has no `secret/` prefix.
- Vault refs resolve before `${{project.X}}` / `${{environment.X}}` and work in env, shared vars, build args and build secrets.
- A missing path or field fails the deploy. After rotating a value, redeploy — running containers keep old env.
- Never put a raw secret in Dokploy env when a vault ref exists; never paste tokens into the repo or chat.

Provider (one-time, already set up): HashiCorp Vault / OpenBao, URL `https://secrets.sandercokart.com` (not `http://openbao:8200` — isolated deployment is on), KV mount `secret`, read/list token, then assign it to projects/environments.

## Handoff

| Need | Where |
| --- | --- |
| OpenBao `kv put` / `patch` / `get` / `delete`, minting tokens | [secrets](../secrets/SKILL.md) once, then stop |
| Secret leak / rotation runbook | [secrets rotation](../secrets/references/rotation.md) |

Docs: [Secrets providers](https://docs.dokploy.com/docs/core/secrets-providers), [Vault / OpenBao](https://docs.dokploy.com/docs/core/secrets-providers/hashicorp).
