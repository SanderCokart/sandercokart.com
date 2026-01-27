############################################
# Base Image
############################################
FROM serversideup/php:8.5-fpm-nginx-alpine AS base

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

RUN --mount=type=secret,id=APP_KEY,target=/run/secrets/APP_KEY,uid=82,gid=82 \
    --mount=type=secret,id=DB_USERNAME,target=/run/secrets/DB_USERNAME,uid=82,gid=82 \
    --mount=type=secret,id=DB_PASSWORD,target=/run/secrets/DB_PASSWORD,uid=82,gid=82 \
    --mount=type=secret,id=REDIS_PASSWORD,target=/run/secrets/REDIS_PASSWORD,uid=82,gid=82 \
    --mount=type=secret,id=RESEND_API_KEY,target=/run/secrets/RESEND_API_KEY,uid=82,gid=82 \
    echo "APP_KEY=$(cat /run/secrets/APP_KEY)" > /var/www/html/.env && \
    echo "DB_USERNAME=$(cat /run/secrets/DB_USERNAME)" >> /var/www/html/.env && \
    echo "DB_PASSWORD=$(cat /run/secrets/DB_PASSWORD)" >> /var/www/html/.env && \
    echo "REDIS_PASSWORD=$(cat /run/secrets/REDIS_PASSWORD)" >> /var/www/html/.env && \
    echo "RESEND_API_KEY=$(cat /run/secrets/RESEND_API_KEY)" >> /var/www/html/.env

RUN composer install --no-dev --optimize-autoloader --no-interaction --no-ansi

USER www-data
