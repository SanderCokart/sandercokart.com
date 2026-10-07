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

# Make mise-managed node/pnpm available in non-login shells.
if [[ -x "${HOME}/.local/bin/mise" ]]; then
  eval "$("${HOME}/.local/bin/mise" activate bash)" 2>/dev/null || true
  export PATH="${HOME}/.local/share/mise/shims:${PATH}"
fi

log "Installing workspace dependencies (pnpm)…"
pnpm install --config.confirmModulesPurge=false

log "Ensuring API .env (decrypt with key, else local fallback)…"
bash .cursor/ensure-api-env.sh

log "Building internal dist packages (runtime-env, toolbox)…"
pnpm exec turbo run build --filter=@repo/runtime-env --filter=@repo/toolbox

log "Install complete."
