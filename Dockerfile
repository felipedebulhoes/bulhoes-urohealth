# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable

COPY package.json pnpm-lock.yaml patches/ ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build \
  && pnpm exec esbuild server/production.ts --platform=node --packages=external --bundle --format=esm --outdir=dist \
  && pnpm prune --prod

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

RUN groupadd --gid 10001 app \
  && useradd --uid 10001 --gid app --create-home --shell /usr/sbin/nologin app

COPY --from=build --chown=app:app /app/package.json ./package.json
COPY --from=build --chown=app:app /app/node_modules ./node_modules
COPY --from=build --chown=app:app /app/dist ./dist

USER app
EXPOSE 8080
CMD ["node", "dist/production.js"]
