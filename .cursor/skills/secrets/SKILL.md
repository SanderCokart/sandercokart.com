---
name: secrets
description: >-
  Manages OpenBao KV v2 secrets with the bao CLI (put, patch, get, list, delete).
  Use when adding, editing, reading, or deleting vault secrets, OpenBao paths,
  or KV fields; adding a userpass user without root; creating ACL policies;
  or when a secret leaked and you need to rotate, revoke a root token, or
  follow the incident runbook. Dokploy env injection lives in the dokploy skill.
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

## Add a user (no root)

`userpass` is already enabled. Sign in as `sander` (admin policy), **not** with the root token.

Never attach policy `root`. Do not attach `admin` unless they should operate the cluster (policies, auth methods, generate-root). `sander` is the only admin userpass account on purpose. Usernames are lowercased (`Alex` = `alex`).

1. Write an ACL that covers only the KV prefix they need. KV v2 uses `secret/data/…` for values and `secret/metadata/…` for list/delete. List on each parent so the UI can browse.

```bash
.cursor/skills/secrets/scripts/bao.sh policy write codehouse-kv - <<'HCL'
path "secret/data/sandercokart/codehouse/*" {
  capabilities = ["create", "read", "update", "patch", "delete"]
}
path "secret/metadata/sandercokart/codehouse/*" {
  capabilities = ["list", "read", "delete"]
}
path "secret/metadata/sandercokart/codehouse" {
  capabilities = ["list"]
}
path "secret/metadata/sandercokart" {
  capabilities = ["list"]
}
path "secret/metadata" {
  capabilities = ["list"]
}
HCL
```

Read-only: drop `create`, `update`, `patch`, `delete` and keep `read` / `list`.

2. Create the user with **that policy only**. `default` is attached automatically. Generate the password in the shell; put it in the password manager; do not paste it into chat.

```bash
PASSWORD=$(openssl rand -base64 24)
.cursor/skills/secrets/scripts/bao.sh write auth/userpass/users/"$USERNAME" \
  password="$PASSWORD" \
  token_policies=codehouse-kv \
  token_ttl=24h \
  token_max_ttl=72h
```

They sign in at [https://secrets.sandercokart.com/ui/](https://secrets.sandercokart.com/ui/) with **Method: Username**, or:

```bash
.cursor/skills/secrets/scripts/bao.sh login -method=userpass username="$USERNAME"
```

Change policy later (omitting `password` keeps the current one). Delete the user to revoke login; outstanding tokens last until TTL unless you revoke them.

```bash
.cursor/skills/secrets/scripts/bao.sh list auth/userpass/users
.cursor/skills/secrets/scripts/bao.sh write auth/userpass/users/"$USERNAME" token_policies=codehouse-kv
.cursor/skills/secrets/scripts/bao.sh delete auth/userpass/users/"$USERNAME"
.cursor/skills/secrets/scripts/bao.sh token revoke -mode=path auth/userpass
```

Dokploy keeps using the orphan `dokploy-read` token, not a userpass user.

## Leak / rotate

If a secret, token, unseal key, or env value leaked, follow [rotation](references/rotation.md). Do not paste values into chat.

## Handoff

| Need | Where |
| --- | --- |
| Put / patch / get / list / delete KV | This skill |
| Add userpass user / ACL policy (not root) | This skill |
| Leak, revoke, rotate (root, tokens, APP_KEY, DB, mail, …) | [rotation](references/rotation.md) |
| Dokploy provider, `${{vault.…}}` env, deploy | [dokploy](../dokploy/SKILL.md) once, then stop |

Docs: [OpenBao HTTP API](https://openbao.org/api-docs), [KV v2](https://openbao.org/docs/secrets/kv/kv-v2/), [userpass](https://openbao.org/docs/auth/userpass/), [policies](https://openbao.org/docs/concepts/policies/).
