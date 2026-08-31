#!/usr/bin/env bash

set -euo pipefail

log() {
  printf '[link-mise-node] %s\n' "$1"
}

if ! command -v mise >/dev/null 2>&1 && [[ ! -x "${HOME}/.local/bin/mise" ]]; then
  log "mise not found, skipping global node link"
  exit 0
fi

MISE_BIN="$(command -v mise 2>/dev/null || true)"
if [[ -z "${MISE_BIN}" && -x "${HOME}/.local/bin/mise" ]]; then
  MISE_BIN="${HOME}/.local/bin/mise"
fi

if [[ -z "${MISE_BIN}" ]]; then
  log "mise not found, skipping global node link"
  exit 0
fi

eval "$("${MISE_BIN}" activate bash)"

NODE_BIN="$("${MISE_BIN}" which node)"
TOOL_DIR="$(dirname "${NODE_BIN}")"

sudo ln -sf "${NODE_BIN}" /usr/local/bin/node
sudo ln -sf "${TOOL_DIR}/npm" /usr/local/bin/npm
sudo ln -sf "${TOOL_DIR}/npx" /usr/local/bin/npx

log "Linked $(node --version) to /usr/local/bin/node"
