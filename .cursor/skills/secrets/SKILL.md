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

OpenBao runs at `https://secrets.sandercokart.com` (UI: `/ui/`, Method **Username**). Run everything locally from the repo root through [`scripts/bao.sh`](scripts/bao.sh) — not over SSH. It defaults `BAO_ADDR`, installs/updates `bao` via mise (`BAO_SKIP_PULL=1` offline) and reuses `~/.vault-token` or `BAO_TOKEN`. `bao` comes from `mise.toml` (`mise install` or `bash ./scripts/setup.sh` on a fresh clone). The UI and the `user-openbao` MCP hit the same API.

For Dokploy env (`${{vault.…}}`, provider, deploy), read [dokploy](../dokploy/SKILL.md) **once**, then stop.

## Login and token hygiene

```bash
.cursor/skills/secrets/scripts/bao.sh login -method=userpass   # password from the password manager
```

- Never echo, read into chat, commit or log tokens, unseal keys or passwords. If no token is available, ask the user to log in or `export BAO_TOKEN` themselves.
- Secret **values** the user asked to set or show may pass through the shell; repeat them only when asked.

## KV (v2, mount `secret`)

Paths: `sandercokart/<service>` or `sandercokart/<service>/<env>`. Name fields after the env var they feed (`DB_PASSWORD`). Pass values from env vars, not literals.

| Task | Command (`bao.sh …`) |
| --- | --- |
| Create / replace **all** fields | `kv put -mount=secret sandercokart/myapp DB_PASSWORD="$DB_PASSWORD" API_KEY="$API_KEY"` |
| Change some fields, keep the rest | `kv patch -mount=secret sandercokart/myapp DB_PASSWORD="$DB_PASSWORD"` |
| List / read / one field | `kv list -mount=secret sandercokart` · `kv get -mount=secret sandercokart/myapp` · `kv get -mount=secret -field=DB_PASSWORD sandercokart/myapp` |
| Soft-delete / restore | `kv delete -mount=secret sandercokart/myapp` · `kv undelete -mount=secret -versions=1 sandercokart/myapp` |
| Destroy versions / wipe path | `kv destroy -mount=secret -versions=1 sandercokart/myapp` · `kv metadata delete -mount=secret sandercokart/myapp` |

`kv put` drops every field you don't pass — use `patch` to edit. Show full `kv get` output only when the user asked to read the secret.

After a change, **redeploy** the Dokploy service that references it; deploys referencing a missing path or field fail closed.

## Handoff

| Need | Where |
| --- | --- |
| Add a userpass user / ACL policy (never root) | [references/add-user.md](references/add-user.md) |
| Leak, revoke, rotate (root, tokens, APP_KEY, DB, mail, …) | [references/rotation.md](references/rotation.md) — never paste values into chat |
| Dokploy provider, `${{vault.…}}` env, deploy | [dokploy](../dokploy/SKILL.md) once, then stop |

Docs: [OpenBao HTTP API](https://openbao.org/api-docs), [KV v2](https://openbao.org/docs/secrets/kv/kv-v2/), [userpass](https://openbao.org/docs/auth/userpass/), [policies](https://openbao.org/docs/concepts/policies/).
