#!/usr/bin/env bash

set -Eeuo pipefail

REPO_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../../../.." && pwd)"
cd "${REPO_ROOT}"

log() {
    printf '[quick-start] %s\n' "$1"
}

fail() {
    printf '[quick-start] error: %s\n' "$1" >&2
    exit 1
}

: "${DOTENV_PRIVATE_KEY_DOCKER:?Set DOTENV_PRIVATE_KEY_DOCKER before running quick-start.}"
: "${DOTENV_PRIVATE_KEY_LOCAL:?Set DOTENV_PRIVATE_KEY_LOCAL before running quick-start.}"

command -v mise >/dev/null 2>&1 || fail "mise is required. Install it before running quick-start."
command -v docker >/dev/null 2>&1 || fail "Docker is required. Install Docker Desktop before running quick-start."

log "Installing mise-managed tools and starting Docker Desktop in parallel..."
mise trust "${REPO_ROOT}"
mise install &
mise_pid=$!

docker_pid=''
if ! docker info >/dev/null 2>&1; then
    docker desktop start >/dev/null 2>&1 &
    docker_pid=$!
fi

wait "${mise_pid}" || fail "mise could not install the pinned project tools."
mise reshim

log "Installing JavaScript dependencies while Docker Desktop finishes starting..."
mise exec -- pnpm install --ignore-scripts --config.confirmModulesPurge=false &
pnpm_install_pid=$!

if [[ -n "${docker_pid}" ]]; then
    wait "${docker_pid}" || fail "Docker Desktop could not be started."
fi
wait "${pnpm_install_pid}" || fail "JavaScript dependencies could not be installed."

log "Decrypting application environments in parallel..."
mise exec -- pnpm --filter api env:use:docker &
api_env_pid=$!
mise exec -- pnpm --filter codehouse env:use:local &
codehouse_env_pid=$!
mise exec -- pnpm --filter main env:use:local &
main_env_pid=$!

wait "${api_env_pid}" || fail "Could not decrypt apps/api/.env."
wait "${codehouse_env_pid}" || fail "Could not decrypt apps/codehouse/.env."
wait "${main_env_pid}" || fail "Could not decrypt apps/main/.env."

if command -v composer >/dev/null 2>&1 && php -m 2>/dev/null | grep -qx 'openssl'; then
    log "Installing API Composer dependencies locally..."
    (cd apps/api && composer install --no-interaction --no-ansi)
else
    log "Local PHP/Composer is unavailable or lacks OpenSSL; using the PHP 8.5 container for vendor installation..."
    docker compose --env-file apps/api/.env --profile development build api
    docker compose --env-file apps/api/.env --profile development run --rm --entrypoint composer api install --no-interaction --no-ansi
fi

log "Starting Laravel, Redis, Mailpit, and database services..."
docker compose --env-file apps/api/.env --profile development up -d --build api redis mailpit

log "Waiting for the API health endpoint..."
for attempt in {1..30}; do
    if curl.exe -fsS http://localhost:8080/health >/dev/null 2>&1; then
        log "API is ready at http://localhost:8080."
        docker compose --env-file apps/api/.env --profile development ps
        exit 0
    fi

    sleep 2
done

docker compose --profile development ps
fail "The API did not become healthy within 60 seconds."
