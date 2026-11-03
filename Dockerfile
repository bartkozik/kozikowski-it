FROM node:24-bookworm-slim@sha256:c86ecead9e55a5210ac1727de38a4ca840bf03dcaf34dc9749addbf383b1920c AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json next.config.ts ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM node:24-bookworm-slim@sha256:c86ecead9e55a5210ac1727de38a4ca840bf03dcaf34dc9749addbf383b1920c AS runtime
WORKDIR /app
ARG APP_REVISION=local
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0 APP_REVISION=$APP_REVISION
LABEL org.opencontainers.image.source="https://github.com/bartkozik/kozikowski-it" org.opencontainers.image.revision=$APP_REVISION
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=3 CMD ["node", "-e", "fetch('http://127.0.0.1:3000/healthz', {signal: AbortSignal.timeout(4000)}).then(r => {if (!r.ok) process.exit(1)}).catch(() => process.exit(1))"]
CMD ["node", "server.js"]
