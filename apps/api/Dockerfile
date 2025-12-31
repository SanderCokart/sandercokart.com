############################################
# Base Image
############################################
FROM serversideup/php:8.5-fpm-nginx-alpine AS base

# Install PHP extensions
RUN install-php-extensions redis

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
USER www-data

############################################
# Production Image
############################################

# Since we're calling "base", production isn't
# calling any of that permission stuff
FROM base AS production

# Copy our app files as www-data (33:33)
COPY --chown=www-data:www-data . /var/www/html
USER www-data
