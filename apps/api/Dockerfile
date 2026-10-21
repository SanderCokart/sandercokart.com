############################################
# Base Image
############################################
FROM serversideup/php:8.5-fpm-nginx-alpine-v5.0.2 AS base

# Install PHP extensions
USER root
RUN install-php-extensions redis

USER www-data

############################################
# Development Image
############################################
FROM base AS development

# We can pass USER_ID and GROUP_ID as build arguments
# to ensure the www-data user has the same UID and GID
# as the user running Docker.
ARG USER_ID
ARG GROUP_ID

# Switch to root so we can set the user ID and group ID
USER root

RUN docker-php-serversideup-set-id www-data $USER_ID:$GROUP_ID  && \
    docker-php-serversideup-set-file-permissions --owner $USER_ID:$GROUP_ID --service nginx

COPY --chown=www-data:www-data ./apps/api/ /var/www/html
USER www-data

############################################
# Production Image
############################################

# Since we're calling "base", production isn't
# calling any of that permission stuff
FROM base AS production

WORKDIR /var/www/html

# Copy our app files as www-data (33:33)
COPY --chown=www-data:www-data ./apps/api/ /var/www/html

RUN composer install --no-dev --optimize-autoloader --no-interaction --no-ansi

USER www-data

############################################
# Queue worker (CLI variation, no nginx)
############################################
FROM serversideup/php:8.5-cli-alpine-v5.0.2 AS queue

USER root
RUN install-php-extensions redis

WORKDIR /var/www/html
COPY --from=production --chown=www-data:www-data /var/www/html /var/www/html

USER www-data

HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
    CMD pgrep -f "queue:work" || exit 1

CMD ["php", "/var/www/html/artisan", "queue:work", "--tries=3"]

