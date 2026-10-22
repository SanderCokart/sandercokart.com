# Add an OpenBao user (no root)

Run from the repo root with `.cursor/skills/secrets/scripts/bao.sh`.

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
