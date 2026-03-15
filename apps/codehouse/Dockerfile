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