#!/bin/sh

# Custom entrypoint script for Laravel API
# Loads secrets into environment variables

set -e

echo "User ID:"
id -u
echo "Group ID:"
id -g

ls -la /run/secrets

load_secret() {
    local secret_name=$1
    local env_var_name=$2
    local secret_path="/run/secrets/$secret_name"

    if [ -f "$secret_path" ]; then
        export "$env_var_name"=$(cat "$secret_path")
        echo "Loaded $env_var_name from secret $secret_name"
    fi
}

# Load secrets into environment variables
load_secret "APP_KEY" "APP_KEY"
load_secret "DB_USERNAME" "DB_USERNAME"
load_secret "DB_PASSWORD" "DB_PASSWORD"
load_secret "REDIS_PASSWORD" "REDIS_PASSWORD"

# Execute the original entrypoint and CMD
# We need to preserve the original entrypoint's behavior
exec docker-php-serversideup-entrypoint "$@"
