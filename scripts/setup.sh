#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "${SCRIPT_DIR}/.." && pwd)"
cd "${REPO_ROOT}"

log() {
  printf '[setup] %s\n' "$1"
}

fail() {
  printf '[setup] error: %s\n' "$1" >&2
  exit 1
}

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

MISE_BIN=""

if command_exists mise; then
  MISE_BIN="$(command -v mise)"
elif [[ -x "${HOME}/.local/bin/mise" ]]; then
  MISE_BIN="${HOME}/.local/bin/mise"
fi

if [[ -z "${MISE_BIN}" ]]; then
  case "$(uname -s)" in
    Linux*|Darwin*)
      if command_exists curl; then
        log "Installing mise..."
        curl https://mise.run | sh
      elif command_exists brew; then
        log "Installing mise with Homebrew..."
        brew install mise
      else
        fail "mise is not installed and neither curl nor brew is available."
      fi
      ;;
    *)
      fail "Unsupported OS for automated mise install. Please install mise manually."
      ;;
  esac
fi

if command_exists mise; then
  MISE_BIN="$(command -v mise)"
elif [[ -x "${HOME}/.local/bin/mise" ]]; then
  MISE_BIN="${HOME}/.local/bin/mise"
else
  fail "mise installation did not produce a usable binary."
fi

ACTIVATE_LINE='eval "$('"${MISE_BIN}"' activate bash)"'
ACTIVATE_MARKER='mise activate bash'

if [[ -f "${HOME}/.bashrc" ]]; then
  if ! grep -F "${ACTIVATE_MARKER}" "${HOME}/.bashrc" >/dev/null 2>&1; then
    log "Adding mise activation to ~/.bashrc..."
    printf '\n%s\n' "${ACTIVATE_LINE}" >> "${HOME}/.bashrc"
  else
    log "mise activation already present in ~/.bashrc."
  fi
else
  log "Creating ~/.bashrc and adding mise activation..."
  printf '%s\n' "${ACTIVATE_LINE}" > "${HOME}/.bashrc"
fi

log "Activating mise in this shell..."
eval "$("${MISE_BIN}" activate bash)"

log "Trusting project mise config..."
"${MISE_BIN}" trust "${REPO_ROOT}"

log "Installing tools from mise.toml..."
"${MISE_BIN}" install

log "Refreshing mise shims..."
"${MISE_BIN}" reshim

log "Re-activating mise so newly installed tools are on PATH..."
eval "$("${MISE_BIN}" activate bash)"

if ! pnpm --version >/dev/null 2>&1; then
  fail "pnpm is unavailable after mise install/reshim. Open a new terminal and run setup again."
fi

log "Installing JavaScript dependencies..."
pnpm install --config.confirmModulesPurge=false

log "Setup complete."
log "Start Codehouse with: pnpm --filter codehouse dev"
