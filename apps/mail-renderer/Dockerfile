# Builder uses the official mise Debian image so Node/pnpm versions come from
# mise.toml + package.json (same source of truth as local/CI). The image already
# has mise, curl, git, and ca-certificates — no apt/curl bootstrap.
# Pin a full version tag, not floating `debian` / `latest`.
# https://mise.jdx.dev/mise-cookbook/docker.html
FROM ghcr.io/jdx/mise:2026.10.8-debian AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="/mise/shims:$PNPM_HOME:$PATH"
# Root mise.toml also lists php for the Laravel API. Ignore it here so shims
# do not try to resolve php@8.5 on every pnpm/turbo invocation.
ENV MISE_DISABLE_TOOLS=php

WORKDIR /app
COPY mise.toml package.json ./
RUN --mount=type=cache,id=mise,target=/mise/cache \
	mise trust /app && mise install node pnpm

FROM base AS pruner
WORKDIR /app

COPY . .

# Same turbo version as the root package.json, so prune and build hash like local builds.
RUN pnpm dlx "turbo@$(node -p 'require("./package.json").devDependencies.turbo')" prune mail-renderer --docker

FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --frozen-lockfile
RUN pnpm install --offline

COPY --from=pruner /app/out/pnpm-lock.yaml /app/out/full/ ./

RUN pnpm exec turbo run build --filter=mail-renderer

# Bundled dist/server.js has no native node_modules, so alpine is safe.
FROM node:22-alpine AS runner

RUN addgroup -g 1001 -S nodejs \
	&& adduser -S -u 1001 -G nodejs mailrenderer

WORKDIR /app

COPY --from=builder --chown=mailrenderer:nodejs /app/apps/mail-renderer/dist ./dist

USER mailrenderer

ENV NODE_ENV=production
ENV PORT=4010

EXPOSE 4010

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
	CMD node -e "fetch('http://127.0.0.1:4010/health').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "dist/server.js"]
