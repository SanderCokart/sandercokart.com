#!/usr/bin/env bash
# HTTP client for https://secrets.sandercokart.com. Installs `bao` via mise.
# Auth: BAO_TOKEN if set, otherwise bao's token helper (~/.vault-token) after login.
set -euo pipefail

: "${BAO_ADDR:=https://secrets.sandercokart.com}"
export BAO_ADDR

if ! command -v mise >/dev/null 2>&1; then
  echo "mise is required to install bao (see mise.toml)." >&2
  exit 1
fi

ROOT="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
cd "${ROOT}"

if [[ "${BAO_SKIP_PULL:-}" != "1" ]]; then
  # Re-resolve @latest so a new GitHub release is picked up; already-installed
  # versions are a no-op. stdout stays clean for `kv get -field=`.
  mise install openbao@latest >/dev/null
fi

exec mise exec openbao@latest -- bao "$@"
