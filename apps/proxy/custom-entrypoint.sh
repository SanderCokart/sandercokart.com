#!/bin/sh

# Custom entrypoint script for Traefik
# Sets the ACME email from secret file as environment variable

set -e

# Read the ACME email from the secret file and export it as an environment variable
if [ -f "/run/secrets/TRAEFIK_ACME_EMAIL" ]; then
    export TRAEFIK_CERTIFICATESRESOLVERS_MYRESOLVER_ACME_EMAIL=$(cat /run/secrets/TRAEFIK_ACME_EMAIL)
    echo "Set TRAEFIK_CERTIFICATESRESOLVERS_MYRESOLVER_ACME_EMAIL from secret file"
else
    echo "Warning: /run/secrets/TRAEFIK_ACME_EMAIL not found"
fi

# Execute Traefik directly in daemon mode
exec traefik