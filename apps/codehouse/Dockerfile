FROM node:lts-alpine AS base

RUN npm install -g corepack@latest

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

FROM base AS pruner
WORKDIR /app

COPY . .

RUN pnpm dlx turbo prune codehouse --docker

FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --frozen-lockfile --prefer-frozen-lockfile
RUN pnpm install --offline

# Required for docker
ENV NEXT_OUTPUT=standalone

COPY --from=pruner /app/out/pnpm-lock.yaml /app/out/full/ ./
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN --mount=type=secret,id=TURBO_TOKEN \
	export SENTRY_AUTH_TOKEN="$(cat /run/secrets/SENTRY_AUTH_TOKEN)" TURBO_TOKEN="$(cat /run/secrets/TURBO_TOKEN)" && \
	pnpm dlx turbo build

FROM node:lts-alpine AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/codehouse/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/codehouse/.next/static ./apps/codehouse/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/codehouse/public ./apps/codehouse/public

RUN apk update
RUN apk add --no-cache ca-certificates libc6-compat

CMD ["node","apps/codehouse/server.js"]