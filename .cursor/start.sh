#!/usr/bin/env bash
#
# Cloud Agent environment — start phase (idempotent, per-boot).
#
# Brings up the backing services the Laravel API expects for local dev:
#   - MariaDB   (127.0.0.1:3306, databases `primary` + `testing`)
#   - Redis     (127.0.0.1:6379, requirepass "password")
#   - Mailpit   (SMTP 127.0.0.1:1025, web UI 127.0.0.1:8025)
#
# It also maps the docker-compose service hostnames (db, redis, mailpit) to
# loopback so the decrypted .env (MAIL_HOST=mailpit) and phpunit.xml
# (DB_HOST=db) resolve without Docker, then runs pending migrations.
#
# The dev servers themselves (api, codehouse, main) run as persistent
# terminals, not here. This script starts daemons, checks readiness, returns.
set -uo pipefail

REPO_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${REPO_ROOT}"

log() { printf '[start] %s\n' "$1"; }

# 1. Map compose service hostnames to loopback (best effort).
if ! grep -qE '^127\.0\.0\.1[[:space:]].*\bmailpit\b' /etc/hosts 2>/dev/null; then
  echo '127.0.0.1 db redis mailpit' | sudo tee -a /etc/hosts >/dev/null 2>&1 || \
    log "warning: could not update /etc/hosts (mailpit/db hostname mapping)"
fi

# 2. Redis (password-protected to match REDIS_PASSWORD).
if ! redis-cli -a password -h 127.0.0.1 -p 6379 ping >/dev/null 2>&1; then
  log "Starting Redis…"
  sudo redis-server --daemonize yes --requirepass password --port 6379 --bind 127.0.0.1
fi

# 3. MariaDB.
if ! sudo mariadb -e 'SELECT 1' >/dev/null 2>&1; then
  log "Starting MariaDB…"
  sudo mkdir -p /var/run/mysqld && sudo chown mysql:mysql /var/run/mysqld
  sudo bash -c 'nohup mariadbd-safe >/var/log/mariadb-boot.log 2>&1 &'
  for _ in $(seq 1 60); do
    sudo mariadb -e 'SELECT 1' >/dev/null 2>&1 && break
    sleep 1
  done
fi

if sudo mariadb -e 'SELECT 1' >/dev/null 2>&1; then
  log "Ensuring databases and anonymous dev user exist…"
  sudo mariadb <<'SQL' || log "warning: MariaDB bootstrap SQL failed"
CREATE DATABASE IF NOT EXISTS `primary` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS `testing` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS ''@'localhost' IDENTIFIED BY '';
CREATE USER IF NOT EXISTS ''@'127.0.0.1' IDENTIFIED BY '';
CREATE USER IF NOT EXISTS ''@'%' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON `primary`.* TO ''@'localhost', ''@'127.0.0.1', ''@'%';
GRANT ALL PRIVILEGES ON `testing`.* TO ''@'localhost', ''@'127.0.0.1', ''@'%';
FLUSH PRIVILEGES;
SQL
else
  log "warning: MariaDB is not reachable; skipping database bootstrap and migrations"
fi

# 4. Mailpit.
if ! pgrep -x mailpit >/dev/null 2>&1; then
  log "Starting Mailpit…"
  nohup mailpit --smtp 0.0.0.0:1025 --listen 0.0.0.0:8025 >/tmp/mailpit.log 2>&1 &
fi

# 5. Run pending migrations against the dev database.
if [[ -f apps/api/.env ]] && sudo mariadb -e 'SELECT 1' >/dev/null 2>&1; then
  log "Running database migrations…"
  (cd apps/api && php artisan migrate --force --graceful --ansi) || \
    log "warning: migrations did not complete"
fi

log "Start complete."
