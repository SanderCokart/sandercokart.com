# Secret leak and rotation

Incident runbook when a token, password, key, or env value is disclosed. Values stay in the shell, password manager, and OpenBao. Chat, commits, skills, logs, and screenshots stay free of them.

OpenBao CLI: from the repo root, `.cursor/skills/secrets/scripts/bao.sh` (this skill). Dokploy provider, `${{vault.…}}` env, and deploys: [dokploy](../../dokploy/SKILL.md) once, then stop.

## Decide blast radius

| What leaked | Treat as disclosed | Then |
| --- | --- | --- |
| One KV field (e.g. `MAIL_PASSWORD`) | That field, every copy | Rotate that type below |
| Dokploy provider token (`dokploy-read`) | **All** KV values it can read | New provider token + rotate every application secret |
| OpenBao **root token** | **Everything** in OpenBao, plus any token the attacker minted | [Root token](#root-token) then every application secret |
| `userpass` password (`sander`) | Admin access until sessions expire | [Userpass](#userpass-admin) then audit tokens |
| Unseal key (`BAO_UNSEAL_KEY`) | Ability to unseal a stolen Raft volume | [Unseal key](#unseal-key) |
| dotenvx private key (`DOTENV_PRIVATE_KEY_*` / `.env.keys`) | Every value in committed `.envx*` ciphertext | [dotenvx](#dotenvx-private-key) then those application secrets |
| Dokploy app env (plaintext, not a vault ref) | That env var on that service | Rotate at source, then edit Dokploy env and redeploy |

Staging Codehouse is vault-backed. Production API still has some secrets **inline** in Dokploy env — rotate those in Dokploy as well as at the source.

## First 15 minutes

1. Identify **what** leaked and **where** (chat, git, screenshot, container inspect, OpenBao UI).
2. If OpenBao admin is still yours: log in with `userpass` (not the leaked root token) and **revoke** the leaked credential before rotating application secrets.
3. Assume the attacker **read** whatever that credential could read. A root or `dokploy-read` leak is a full KV disclosure.
4. Rotate **source first** (MariaDB, Redis, Stalwart, Sentry, Vercel), then **OpenBao** (`kv patch`), then **consumers** (Dokploy **redeploy**). Running containers keep old env until deploy.
5. Use `kv patch`, never a partial `kv put` — `put` replaces the whole map.
6. After rotation, confirm the old value fails and the new value works. Update the password manager last so it matches production.

```bash
export BAO_ADDR=https://secrets.sandercokart.com
# userpass session in ~/.vault-token, or BAO_TOKEN from the password manager
.cursor/skills/secrets/scripts/bao.sh token lookup
```

Dokploy refs look like `${{vault.secrets.sandercokart/codehouse/staging:FIELD}}`. Provider name is `secrets`. KV mount is `secret`. Staging path is `sandercokart/codehouse/staging`.

---

## OpenBao control plane

### Root token

Root is break-glass only. Day-to-day: `userpass` user `sander` (admin policy). Dokploy must **not** use root.

If the root token leaked:

1. Sign in as `sander` (`bao.sh login -method=userpass`) from a machine you trust.
2. Revoke the leaked token (and children):

```bash
.cursor/skills/secrets/scripts/bao.sh token revoke "$LEAKED_ROOT_TOKEN"
```

3. Change the `userpass` password ([below](#userpass-admin)) — root can reset it.
4. List accessors and revoke anything you did not mint:

```bash
.cursor/skills/secrets/scripts/bao.sh list auth/token/accessors
.cursor/skills/secrets/scripts/bao.sh token revoke -accessor "$ACCESSOR"
```

5. Mint a **new** `dokploy-read` orphan token and update the Dokploy provider ([below](#dokploy-provider-token)). Revoke the old Dokploy token.
6. Optionally mint a new root for the password manager only, then stop using it:

```bash
.cursor/skills/secrets/scripts/bao.sh operator generate-root -generate-otp
.cursor/skills/secrets/scripts/bao.sh operator generate-root -init -otp="$OTP"
.cursor/skills/secrets/scripts/bao.sh operator generate-root -otp="$OTP"   # paste unseal key when prompted
.cursor/skills/secrets/scripts/bao.sh operator generate-root -decode="$ENCODED" -otp="$OTP"
```

OpenBao 2.6+ `generate-root` is **authenticated**. You need a working admin login (or the still-valid leaked root, used once from a trusted host). Keep `userpass` + unseal key in the password manager so you are not locked out.

7. Treat **all** KV fields as disclosed. Rotate every application secret in this file.
8. Delete `~/.vault-token` on any machine that might have stored the leaked root. Rotate OpenBao MCP / agent `BAO_TOKEN` if it was root.

### Userpass admin

```bash
NEW=$(openssl rand -base64 32)
.cursor/skills/secrets/scripts/bao.sh write auth/userpass/users/sander password="$NEW"
```

Store `$NEW` in the password manager. Revoke outstanding userpass sessions:

```bash
.cursor/skills/secrets/scripts/bao.sh token revoke -mode=path auth/userpass
```

Existing 24h UI sessions die. Log in again. If the attacker had admin, continue with Dokploy token + all application secrets.

### Dokploy provider token

Policy `dokploy-read` (read `secret/data/*`, list `secret/metadata/*`). Orphan, long period (Dokploy does not renew).

```bash
.cursor/skills/secrets/scripts/bao.sh token create \
  -policy=dokploy-read \
  -orphan \
  -period=8760h \
  -display-name=dokploy
```

Copy the token once. Update Dokploy **Settings → Secrets → `secrets`** (or `vaultProvider-update` with the new `config.token`; keep URL `https://secrets.sandercokart.com`, mount `secret`, assignments unchanged). **Test connection.** Revoke the old token. Redeploy is not required until KV values change.

A leaked `dokploy-read` token can **read every secret**. Rotate all application secrets after replacing it.

### Unseal key

Compose stack `openbao` (project **storage** / **production**) injects `BAO_UNSEAL_KEY` into the unsealer sidecar.

```bash
.cursor/skills/secrets/scripts/bao.sh operator rotate-keys -init -key-shares=1 -key-threshold=1
.cursor/skills/secrets/scripts/bao.sh operator rotate-keys   # paste the current unseal key
```

Save the new key in the password manager. Put it in the OpenBao compose env (`compose-saveEnvironment`), then **redeploy** that compose so the unsealer uses it. Old key cannot unseal after rotation.

If the attacker also has a disk snapshot from **before** rotate-keys, rotate all KV values too.

---

## Application secrets

Inventory (OpenBao staging path `sandercokart/codehouse/staging` unless noted):

| Field | Source of truth | Staging consumers | Also stored |
| --- | --- | --- | --- |
| `DB_PASSWORD` | Dokploy MariaDB (`db-primary` / `primary-db`) | `api`, `api-queue` | `.envx.local` / `.envx.docker` (dev only) |
| `REDIS_PASSWORD` | Dokploy Redis (`cache`) | `api`, `api-queue` | `.envx.local` / `.envx.docker` |
| `MAIL_PASSWORD` | Stalwart mailbox password | `api`, `api-queue` | `.envx.local` / `.envx.docker` |
| `APP_KEY` | Laravel app key | `api`, `api-queue` | `.envx.local` / `.envx.docker` / `.envx.production` |
| `SENTRY_AUTH_TOKEN` | Sentry org auth token | Codehouse **project** env → Next `buildSecrets` | `.envx.local` / `.envx.production` (codehouse + main) |
| `TURBO_TOKEN` | Vercel token for team `sander-cokart` | Same project env / `buildSecrets` | same `.envx*` files |
| `sandercokart/healthcheck` | Canary only (`ok`, `note`) | None | — |

Production Codehouse API may still have `APP_KEY`, `DB_PASSWORD`, `REDIS_PASSWORD`, `MAIL_PASSWORD` **plaintext** in Dokploy. After rotating the source, patch those env strings (or convert them to `${{vault.secrets.…}}` refs) and redeploy.

Patch after the source accepts the new value:

```bash
.cursor/skills/secrets/scripts/bao.sh kv patch -mount=secret sandercokart/codehouse/staging \
  FIELD="$NEW"
```

Then [dokploy](../../dokploy/SKILL.md): **deploy** every consumer. `reload` is not enough if the task still has the old env.

### `DB_PASSWORD`

1. `NEW=$(openssl rand -base64 32)` (avoid characters MariaDB quoting hates if you wrap in quotes).
2. Dokploy `mariadb-changePassword` on that environment’s MariaDB (`type: user`; also `root` if Dokploy stores a root password).
3. `kv patch` `DB_PASSWORD` (staging). Production: patch Dokploy `api` + `api-queue` env if still plaintext.
4. Deploy staging/production `api` and `api-queue` immediately — the DB already rejects the old password.
5. Local Docker only if **that** password leaked: update `apps/api/.envx.docker` / `.envx.local` with dotenvx, recreate the Compose DB.

### `REDIS_PASSWORD`

1. Generate `NEW`.
2. Dokploy `redis-changePassword` on that environment’s `cache`.
3. `kv patch` `REDIS_PASSWORD` (and production Dokploy env if plaintext).
4. Deploy `api` and `api-queue`. Sessions in Redis are dropped; users sign in again.

### `MAIL_PASSWORD`

Staging SMTP user is `sander@sandercokart.com`; production has used `info@sandercokart.com`. Confirm `MAIL_USERNAME` on the app before resetting.

1. Stalwart admin: `reset_password` for that mailbox (omit `password` to let it generate).
2. `kv patch` `MAIL_PASSWORD`.
3. Deploy `api` and `api-queue`.
4. Send a test contact mail. Update dotenvx copies only if local SMTP uses the same mailbox.

### `APP_KEY`

Laravel uses this for cookies and encryption. This API does not persist encrypted Eloquent casts; rotation **invalidates sessions/cookies**. Generate a **different** key per environment.

```bash
# apps/api, PHP 8.5 — print only, do not write dotenvx until you choose to
php artisan key:generate --show
```

1. `kv patch` `APP_KEY` (staging). Production: Dokploy env or vault ref.
2. Deploy `api` and `api-queue`.
3. Align `.envx*` for that environment with dotenvx if it still carries `APP_KEY`.

If `APP_KEY` leaked, treat cache/session data as attacker-readable. Redis password rotation on top is reasonable.

### `SENTRY_AUTH_TOKEN`

1. Sentry → Settings → Auth Tokens: disable the leaked token, create a new org token with the same scopes (release / sourcemap upload).
2. `kv patch` `SENTRY_AUTH_TOKEN`.
3. Update `SENTRY_AUTH_TOKEN` in `apps/codehouse` and `apps/main` `.envx.local` / `.envx.production` via dotenvx (build-time).
4. Deploy staging/production `codehouse` and `main` so `buildSecrets` pick it up. Runtime DSN (`NEXT_PUBLIC_SENTRY_DSN`) is not this token; rotate the DSN separately only if it leaked.

### `TURBO_TOKEN`

1. Vercel → account tokens: revoke the leaked token, mint a new one for team `sander-cokart`.
2. `kv patch` `TURBO_TOKEN`.
3. Update the same `.envx*` files as Sentry.
4. Deploy Next apps that pass `TURBO_TOKEN` as a build secret. CI copies (GitHub Actions) if any.

---

## dotenvx private key

Committed `.envx*` files are ciphertext. The private keys (`DOTENV_PRIVATE_KEY_LOCAL`, `DOTENV_PRIVATE_KEY_DOCKER`, `DOTENV_PRIVATE_KEY_PRODUCTION`, or `.env.keys`) decrypt **all historical commits**.

1. Generate a new dotenvx keypair; store private keys only in the password manager / unlocked `.env.keys` (gitignored).
2. Re-encrypt current `.envx*` with the new public key.
3. **Rotate every secret those files contained** (`APP_KEY`, DB/Redis/mail passwords, Sentry, Turbo). Old ciphertext stays in git history.
4. Pull new private keys onto machines that decrypt; drop the old `DOTENV_PRIVATE_KEY_*` from shells and CI.

Do not write private keys into skills, chat, or the repo.

---

## Aftercare

- Password manager holds the new root (if any), unseal key, userpass, Dokploy token, and dotenvx keys.
- `bao.sh kv get -mount=secret sandercokart/codehouse/staging` — confirm fields exist; do not dump values into chat.
- Hit staging API health, send a test mail, log in after Redis/APP_KEY rotation.
- If the leak was git: rewrite is optional; **rotation** is what matters. History still has ciphertext or accidental plaintext.
- Add a short note to yourself: what leaked, when, what was rotated. No secret values in the note.
