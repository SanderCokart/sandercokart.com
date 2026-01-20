FROM traefik:latest

# Copy custom entrypoint script
COPY apps/proxy/custom-entrypoint.sh /custom-entrypoint.sh
RUN chmod +x /custom-entrypoint.sh

RUN ls -la

# Set the custom entrypoint
ENTRYPOINT ["/custom-entrypoint.sh"]