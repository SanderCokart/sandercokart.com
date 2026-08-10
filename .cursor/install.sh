#!/usr/bin/env bash
#
# Cloud Agent environment — install phase (idempotent).
#
# Refreshes source-derived dependencies after the repository is checked out:
#   - JavaScript/TypeScript workspace dependencies (pnpm)
#   - Laravel API PHP dependencies (composer, via the api package postinstall)
#   - Decrypted per-app .env files (when DOTENV_PRIVATE_KEY_LOCAL is available)
#   - Built output for internal packages that ship a dist/ (runtime-env, toolbox)
#
# System packages (PHP 8.5, Node, pnpm, MariaDB, Redis, Mailpit) come from the
# base snapshot. Long-running services and migrations live in start.sh.
set -euo pipefail

REPO_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${REPO_ROOT}"

log() { printf '[install] %s\n' "$1"; }

log "Installing workspace dependencies (pnpm)…"
pnpm install --config.confirmModulesPurge=false

if [[ -n "${DOTENV_PRIVATE_KEY_LOCAL:-}" ]]; then
  log "Decrypting local env files for api, main, codehouse…"
  for app in api main codehouse; do
    pnpm --filter "${app}" env:use:local
  done
else
  log "DOTENV_PRIVATE_KEY_LOCAL not set — keeping existing .env files (add it as a secret to refresh them)."
fi

log "Building internal dist packages (runtime-env, toolbox)…"
pnpm exec turbo run build --filter=@repo/runtime-env --filter=@repo/toolbox

if [[ -f apps/api/.env ]]; then
  if ! grep -qE '^APP_KEY=base64:' apps/api/.env; then
    log "Generating Laravel APP_KEY…"
    (cd apps/api && php artisan key:generate --force --ansi)
  fi
fi

log "Install complete."
