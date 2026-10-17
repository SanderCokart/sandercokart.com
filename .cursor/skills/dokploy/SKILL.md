---
name: dokploy
description: >-
  Operates Dokploy for this monorepo (compose, applications, domains, env).
  Use when deploying on Dokploy, editing service environment variables, or
  wiring OpenBao into `${{vault.}}` references. Does not cover OpenBao KV CLI
  — that is the secrets skill.
---

# Dokploy

This skill owns Dokploy: services, domains, env files, and **consuming** vault references at deploy time.

To create, edit, read, or delete values **inside** OpenBao, read [secrets](../secrets/SKILL.md) **once**, then stop. Do not follow that skill's handoff back here.

## How to operate

Prefer the `user-dokploy-mcp` tools over SSH. Discover a tool's schema before calling it. Vault CLI also runs locally against HTTPS (see secrets skill), not over SSH.

Typical tools: `project-search`, `environment-one`, `compose-one`, `compose-saveEnvironment`, `compose-deploy`, `application-saveEnvironment`, `domain-byComposeId`.

OpenBao for this server is the compose stack `openbao` in project **storage** / **production**, URL `https://secrets.sandercokart.com`. Isolated deployment is on — Dokploy must use that **HTTPS hostname**, not `http://openbao:8200`.

## Secrets provider (one-time)

Dokploy does not store secret values. Settings → **Secrets** → Add Provider → **HashiCorp Vault / OpenBao**:

| Field | Value |
| --- | --- |
| Name | identifier used in env, e.g. `openbao` (letters, numbers, dashes, underscores) |
| Vault URL | `https://secrets.sandercokart.com` |
| Token | a **read/list** token from OpenBao (not root). Token minting is CLI — see secrets skill once if you must create one |
| KV Mount | `secret` |
| Namespace | empty |

Test connection, then assign projects/environments. A provider with no assignments is usable nowhere.

Do not paste tokens into this skill, the repo, or chat summaries.

## Env syntax

Vault refs resolve **before** `${{project.X}}` and `${{environment.X}}`. They work on service env, project/environment shared vars, build args, and build secrets.

```bash
# KV v2: path inside mount `secret`, then field name
DB_PASSWORD=${{vault.openbao.sandercokart/myapp:DB_PASSWORD}}
API_KEY=${{vault.openbao.sandercokart/myapp:API_KEY}}
```

Shape: `${{vault.<provider-name>.<path>:<field>}}`

- `<provider-name>` — Name from Settings → Secrets (not the hostname)
- `<path>` — KV path with no `secret/` prefix (`sandercokart/myapp`)
- `<field>` — key inside that secret's map

Type `${{` in the Dokploy env editor for autocomplete.

Save via MCP as a dotenv **string** (`compose-saveEnvironment.env` or `application-saveEnvironment.env`). After rotation in OpenBao, **redeploy** — running containers keep old env until then. A missing path/field fails the deploy instead of injecting empty.

Compose example:

```
DB_PASSWORD=${{vault.openbao.sandercokart/myapp:DB_PASSWORD}}
```

Do not put raw secret values in Dokploy env when a vault ref exists.

## Handoff (no recursion)

| Need | Where |
| --- | --- |
| Dokploy env, provider, `${{vault.…}}`, deploy | This skill |
| OpenBao `kv put` / `patch` / `get` / `delete` | [secrets](../secrets/SKILL.md) once, then stop |

Docs: [Secrets providers](https://docs.dokploy.com/docs/core/secrets-providers), [Vault / OpenBao](https://docs.dokploy.com/docs/core/secrets-providers/hashicorp).
