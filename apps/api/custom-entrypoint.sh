#!/bin/sh

# Custom entrypoint script for Laravel API
# Loads secrets into environment variables

set -e

echo "User ID:"
id -u
echo "Group ID:"
id -g

ls -la /run/secrets

load_secrets() {
    local secrets_dir="/run/secrets"

    if [ -d "$secrets_dir" ]; then
        echo "Loading secrets from $secrets_dir..."

        for secret_file in "$secrets_dir"/*; do
            if [ -f "$secret_file" ]; then
                # Extract filename without path
                local filename=$(basename "$secret_file")

                # Use filename as environment variable name
                local env_var_name="$filename"

                # Load the secret value
                local secret_value=$(cat "$secret_file")

                # Export as environment variable
                export "$env_var_name"="$secret_value"
                echo "Loaded $env_var_name from secret file $filename"
            fi
        done
    else
        echo "Secrets directory $secrets_dir not found"
    fi
}

# Load all secrets into environment variables
load_secrets

# Execute the original entrypoint and CMD
# We need to preserve the original entrypoint's behavior
exec docker-php-serversideup-entrypoint "$@"
