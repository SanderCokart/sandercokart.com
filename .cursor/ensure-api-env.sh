#!/usr/bin/env bash
#
# Ensure the Laravel API (and, when possible, the web apps) have a usable .env.
#
# The real per-app config lives in encrypted .envx.local files. When the
# DOTENV_PRIVATE_KEY_LOCAL secret is present we decrypt those to .env. When it
# is not (e.g. a fresh Cloud Agent without the secret configured), we still want
# a working dev environment, so we write a functional local .env for the API
# using non-sensitive local defaults that match the natively-run services
# (MariaDB `primary`, Redis with password, Mailpit). Production/build-only
# secrets (Sentry, Resend, Turbo) are intentionally omitted — local dev does
# not need them.
#
# The Next.js apps read every variable as optional (see apps/*/src/env.ts), so
# they run fine without a .env when the key is absent.
#
# Safe to run repeatedly (idempotent).
set -euo pipefail

REPO_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${REPO_ROOT}"

# Make mise-managed node/pnpm available in non-login shells (needed for dotenvx).
if [[ -x "${HOME}/.local/bin/mise" ]]; then
  eval "$("${HOME}/.local/bin/mise" activate bash)" 2>/dev/null || true
  export PATH="${HOME}/.local/share/mise/shims:${PATH}"
fi

log() { printf '[env] %s\n' "$1"; }

API_ENV="apps/api/.env"

if [[ -n "${DOTENV_PRIVATE_KEY_LOCAL:-}" ]]; then
  log "DOTENV_PRIVATE_KEY_LOCAL present — decrypting .envx.local for api, main, codehouse…"
  for app in api main codehouse; do
    pnpm --filter "${app}" env:use:local
  done
elif [[ ! -f "${API_ENV}" ]]; then
  log "No DOTENV_PRIVATE_KEY_LOCAL and no apps/api/.env — writing a local dev fallback…"
  cat > "${API_ENV}" <<'ENV'
# Generated local dev fallback (no DOTENV_PRIVATE_KEY_LOCAL available).
# Matches the natively-run MariaDB/Redis/Mailpit services. Set the
# DOTENV_PRIVATE_KEY_LOCAL secret to instead decrypt the canonical .envx.local.
APP_NAME="Sander Cokart"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://127.0.0.1:8000

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mariadb
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=primary
DB_USERNAME=
DB_PASSWORD=

SESSION_DRIVER=redis
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=localhost

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=redis
CACHE_PREFIX=

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=password
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

MAIL_TO_ADDRESS="contact@example.com"
MAIL_TO_NAME="Sander Cokart"

VITE_APP_NAME="${APP_NAME}"
ENV
else
  log "apps/api/.env already present — leaving it as is."
fi

if [[ -f "${API_ENV}" ]] && ! grep -qE '^APP_KEY=base64:' "${API_ENV}"; then
  log "Generating Laravel APP_KEY…"
  (cd apps/api && php artisan key:generate --force --ansi)
fi
