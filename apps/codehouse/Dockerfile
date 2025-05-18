FROM node:20.18.3-alpine AS base

RUN npm install -g corepack@latest

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

RUN apk update
RUN apk add --no-cache ca-certificates libc6-compat

FROM base AS pruner
WORKDIR /app

COPY . .

RUN pnpm dlx turbo prune codehouse --docker

FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --frozen-lockfile --prefer-frozen-lockfile
RUN pnpm install --offline

ARG CI=disabled
ENV CI=$CI

# Required for docker
ENV NEXT_OUTPUT=standalone

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ARG NEXT_PUBLIC_ENV
ENV NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV

ARG SENTRY_ENABLED=true
ENV SENTRY_ENABLED=$SENTRY_ENABLED

ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM

RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN SENTRY_AUTH_TOKEN=$(cat /run/secrets/SENTRY_AUTH_TOKEN)
RUN --mount=type=secret,id=TURBO_TOKEN TURBO_TOKEN=$(cat /run/secrets/TURBO_TOKEN)

COPY --from=pruner /app/out/pnpm-lock.yaml /app/out/full/ ./
RUN pnpm dlx turbo build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/codehouse/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/codehouse/.next/static ./apps/codehouse/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/codehouse/public ./apps/codehouse/public

CMD ["node","apps/codehouse/server.js"]