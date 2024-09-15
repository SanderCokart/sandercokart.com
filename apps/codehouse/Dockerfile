FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apk update
RUN apk add --no-cache ca-certificates libc6-compat

FROM base AS pruner
WORKDIR /app

COPY . .

RUN pnpm dlx turbo prune codehouse.sandercokart.com --docker

FROM base AS installer
WORKDIR /app

COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --frozen-lockfile --prefer-frozen-lockfile
RUN pnpm install --offline

FROM base AS builder
WORKDIR /app

ARG API_URL
ENV API_URL=$API_URL

COPY --from=installer /app/ /app
COPY --from=pruner /app/out/full/ .
RUN pnpm dlx turbo build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/codehouse.sandercokart.com/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/codehouse.sandercokart.com/.next/static ./apps/codehouse.sandercokart.com/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/codehouse.sandercokart.com/public ./apps/codehouse.sandercokart.com/public

EXPOSE 3000

CMD ["node","apps/codehouse.sandercokart.com/server.js"]