# Multi-stage Dockerfile for @preset/api (Fly.io / self-host)
# Build monorepo ve sadece api app'i icin standalone output alir

FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# ---- Deps ----
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/ ./packages/
RUN pnpm install --frozen-lockfile

# ---- Build ----
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY . .
RUN pnpm turbo run build --filter=@preset/api

# ---- Runtime ----
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3002

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=build --chown=nextjs:nodejs /app/apps/api/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/apps/api/.next/static ./apps/api/.next/static
COPY --from=build --chown=nextjs:nodejs /app/apps/api/public ./apps/api/public

USER nextjs
EXPOSE 3002

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3002/api/health || exit 1

CMD ["node", "apps/api/server.js"]
