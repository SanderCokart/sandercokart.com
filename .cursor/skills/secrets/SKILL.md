---
name: secrets
description: >-
  Manages OpenBao KV v2 secrets with the bao CLI (put, patch, get, list, delete).
  Use when adding, editing, reading, or deleting vault secrets, OpenBao paths,
  or KV fields. Dokploy env injection lives in the dokploy skill.
---

# OpenBao secrets

Store and change secret **values** in OpenBao. This skill owns the vault CLI.

For Dokploy service environment (`${{vault.…}}`, provider, deploy), read [dokploy](../dokploy/SKILL.md) **once**, then stop. That skill's handoff stays there.

## Fresh clone

OpenBao is already running at `https://secrets.sandercokart.com`. A clone only needs the **CLI** and a **login**.

1. Bootstrap the repo (`bash ./scripts/setup.sh` or `mise install`). `mise.toml` installs `bao`.
2. Take UI username and password from the password manager.
3. Sign in at [https://secrets.sandercokart.com/ui/](https://secrets.sandercokart.com/ui/) (Method: **Username**), or from the repo root:

```bash
export BAO_ADDR=https://secrets.sandercokart.com
.cursor/skills/secrets/scripts/bao.sh login -method=userpass
```

`bao` writes the session to `~/.vault-token`. Later `bao.sh` commands reuse that file. A dedicated token still works via `export BAO_TOKEN`.

## Token hygiene

Keep **tokens**, **unseal keys**, and **UI passwords** in the environment and password manager. Chat, commits, skills, logs, and screenshots stay free of them.

- Authenticate with `BAO_TOKEN` already exported. If it is unset, ask the user to export it. Leave credential files unread in the conversation.
- Pass the token through the environment (`BAO_TOKEN`), which the wrapper forwards.
- Secret **values** the user asked to set or show may be handled in the shell; summaries repeat them only when the user asked to see them.

```bash
export BAO_ADDR=https://secrets.sandercokart.com
export BAO_TOKEN    # user pastes locally; agent leaves it unechoed
```

## Where to run

Run `bao` in **this workspace** (WSL, laptop, agent shell). It is an HTTP client of `https://secrets.sandercokart.com`.

Same API: [UI](https://secrets.sandercokart.com/ui/) and the OpenBao MCP (`user-openbao`).

## CLI

The CLI is the [Go binary `bao`](https://openbao.org/docs/install/). Mise installs it from `openbao = "latest"` in `mise.toml`.

From the **repo root**:

```bash
.cursor/skills/secrets/scripts/bao.sh <bao args…>
```

Each run runs `mise install openbao@latest` (no-op when current, installs a newer GitHub release when one exists). Offline: `BAO_SKIP_PULL=1`.

KV engine is **v2** at mount `secret`. `kv` paths are relative to that mount.

Dokploy references `path:field` from this mount. Name fields after the env vars you will inject (for example `DB_PASSWORD`).

Layout: `sandercokart/<service>` or `sandercokart/<service>/<env>`.

### Add (new path, or replace all fields)

`kv put` writes a **new version containing exactly the keys you pass**.

```bash
.cursor/skills/secrets/scripts/bao.sh kv put -mount=secret sandercokart/myapp \
  DB_PASSWORD="$DB_PASSWORD" \
  API_KEY="$API_KEY"
```

Pass values from the environment.

### Edit (merge fields)

`kv patch` updates listed keys and keeps the rest:

```bash
.cursor/skills/secrets/scripts/bao.sh kv patch -mount=secret sandercokart/myapp \
  DB_PASSWORD="$DB_PASSWORD"
```

### Read

```bash
.cursor/skills/secrets/scripts/bao.sh kv list -mount=secret sandercokart
.cursor/skills/secrets/scripts/bao.sh kv get -mount=secret sandercokart/myapp
.cursor/skills/secrets/scripts/bao.sh kv get -mount=secret -field=DB_PASSWORD sandercokart/myapp
```

Use `-field=` for a single value. Full `kv get` output belongs in the reply when the user asked to read the secret.

### Delete

Soft-delete the latest version (undelete restores it):

```bash
.cursor/skills/secrets/scripts/bao.sh kv delete -mount=secret sandercokart/myapp
.cursor/skills/secrets/scripts/bao.sh kv undelete -mount=secret -versions=1 sandercokart/myapp
```

Permanently destroy versions, or wipe the path:

```bash
.cursor/skills/secrets/scripts/bao.sh kv destroy -mount=secret -versions=1 sandercokart/myapp
.cursor/skills/secrets/scripts/bao.sh kv metadata delete -mount=secret sandercokart/myapp
```

Dokploy deploys that reference a missing path or field fail closed. Rotate by patching, then **redeploy** the Dokploy service (dokploy skill).

## Handoff

| Need | Where |
| --- | --- |
| Put / patch / get / list / delete KV | This skill |
| Dokploy provider, `${{vault.…}}` env, deploy | [dokploy](../dokploy/SKILL.md) once, then stop |

Docs: [OpenBao HTTP API](https://openbao.org/api-docs), [KV v2](https://openbao.org/docs/secrets/kv/kv-v2/).
