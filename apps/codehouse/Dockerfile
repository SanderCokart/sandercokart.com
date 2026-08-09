# Build stages use bookworm (glibc), not alpine: mise install pulls prebuilt Node/pnpm
# binaries on glibc. On alpine/musl it falls back to compiling Node from source, which
# needs python and build tools we do not want in the image. Runner stays alpine (below).
FROM node:22-bookworm-slim AS base

RUN apt-get update \
	&& apt-get -y --no-install-recommends install \
		bash curl ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV MISE_DATA_DIR="/mise"
ENV MISE_CONFIG_DIR="/mise"
ENV MISE_CACHE_DIR="/mise/cache"
ENV MISE_INSTALL_PATH="/usr/local/bin/mise"
ENV PNPM_HOME="/pnpm"
ENV PATH="/mise/shims:$PNPM_HOME:$PATH"

RUN curl https://mise.run | sh

WORKDIR /app
COPY mise.toml package.json ./
RUN mise trust /app && mise install

FROM base AS pruner
WORKDIR /app

COPY . .

RUN pnpm dlx turbo prune codehouse --docker

FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --frozen-lockfile
RUN pnpm install --offline

# Required for docker
ENV NEXT_OUTPUT=standalone

COPY --from=pruner /app/out/pnpm-lock.yaml /app/out/full/ ./

# Map build secrets to environment and run build (mapping is in apps/codehouse/scripts/docker-build.sh)
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN,required=false \
	--mount=type=secret,id=TURBO_TOKEN,required=false \
	sh ./apps/codehouse/scripts/docker-build.sh

# Production image: standalone Next output only; no mise/pnpm needed here.
FROM node:lts-alpine AS runner

RUN apk update
RUN apk add --no-cache ca-certificates libc6-compat

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/codehouse/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/codehouse/.next/static ./apps/codehouse/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/codehouse/public ./apps/codehouse/public

CMD ["node", "apps/codehouse/server.js"]