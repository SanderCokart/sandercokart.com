#!/bin/sh
# Map build secrets to environment (Dokploy passes these; optional when building locally).
# This file is the single place that defines which build-time secrets are used.
set -a
for var in SENTRY_AUTH_TOKEN TURBO_TOKEN; do
	if [ -f "/run/secrets/$var" ]; then
		export "$var=$(cat /run/secrets/$var)"
	fi
done
set +a
exec bun run build
