FROM oven/bun:latest AS base

FROM base AS pruner
WORKDIR /app

COPY . .

RUN bunx turbo prune main --docker

FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lock .

ENV HUSKY=0

RUN --mount=type=cache,id=bun,target=/root/.bun/install/cache \
	bun install --frozen-lockfile

# Required for docker
ENV NEXT_OUTPUT=standalone

COPY --from=pruner /app/out/full/ .

# Map build secrets to environment and run build (mapping is in apps/main/scripts/docker-build.sh)
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN,required=false \
	--mount=type=secret,id=TURBO_TOKEN,required=false \
	sh ./apps/main/scripts/docker-build.sh

FROM node:lts-alpine AS runner

RUN apk update
RUN apk add --no-cache ca-certificates libc6-compat

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/main/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/main/.next/static ./apps/main/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/main/public ./apps/main/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/main/articles ./apps/main/articles

WORKDIR /apps/main

CMD ["node", "server.js"]
