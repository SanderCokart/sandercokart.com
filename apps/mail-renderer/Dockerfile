# Build stages use bookworm (glibc), not alpine: mise install pulls prebuilt Node/pnpm
# binaries on glibc. On alpine/musl it falls back to compiling Node from source, which
# needs python and build tools we do not want in the image. Runner stays bookworm.
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
# Node/pnpm only. Root mise.toml also lists PHP for the Laravel API; compiling it
# here needs a full toolchain and is unused by this renderer.
RUN mise trust /app && mise install node pnpm

FROM base AS pruner
WORKDIR /app

COPY . .

RUN pnpm dlx turbo prune mail-renderer --docker

FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --frozen-lockfile
RUN pnpm install --offline

COPY --from=pruner /app/out/pnpm-lock.yaml /app/out/full/ ./

RUN pnpm exec turbo run build --filter=mail-renderer

# Same glibc base as the builder so copied node_modules keep working.
FROM node:22-bookworm-slim AS runner

RUN addgroup --system --gid 1001 nodejs \
	&& adduser --system --uid 1001 --ingroup nodejs mailrenderer

WORKDIR /app

COPY --from=builder --chown=mailrenderer:nodejs /app /app

USER mailrenderer

ENV NODE_ENV=production
ENV PORT=4010

EXPOSE 4010

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
	CMD node -e "fetch('http://127.0.0.1:4010/health').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

WORKDIR /app/apps/mail-renderer

CMD ["node", "dist/server.js"]
