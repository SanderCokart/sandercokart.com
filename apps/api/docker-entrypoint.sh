#!/bin/sh
set -e

# Dynamically load all secrets from /run/secrets/ into environment variables.
# This approach matches the simplicity of start.sh and ensures that any secret
# mounted via Docker Compose is automatically available to the application.
if [ -d "/run/secrets" ]; then
    for secret_file in /run/secrets/*; do
        [ -f "$secret_file" ] || continue
        [ -s "$secret_file" ] || continue
        
        secret_name=$(basename "$secret_file")
        export "$secret_name=$(cat "$secret_file")"
        echo "✓ Loaded $secret_name from secret file"
    done
fi

# Execute the original entrypoint from the base image
exec /usr/local/bin/docker-php-serversideup-entrypoint "$@"
