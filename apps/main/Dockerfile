FROM node:lts-alpine AS base

RUN npm install -g corepack@latest

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

FROM base AS pruner
WORKDIR /app

COPY . .

RUN pnpm dlx turbo prune main --docker

FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --frozen-lockfile --prefer-frozen-lockfile
RUN pnpm install --offline

# Required for docker
ENV NEXT_OUTPUT=standalone

COPY --from=pruner /app/out/pnpm-lock.yaml /app/out/full/ ./
RUN --mount=type=secret,id=DOTENV_PRIVATE_KEY_PRODUCTION \
	export DOTENV_PRIVATE_KEY_PRODUCTION="$(cat /run/secrets/DOTENV_PRIVATE_KEY_PRODUCTION)" && \
	pnpm dlx turbo build

FROM node:lts-alpine AS runner

RUN apk update
RUN apk add --no-cache ca-certificates libc6-compat

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/main/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/main/.next/static ./apps/main/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/main/public ./apps/main/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/main/.envx.production ./.envx.production

CMD ["npx", "@dotenvx/dotenvx", "run", "-f", ".envx.production", "--", "node", "apps/main/server.js"]
