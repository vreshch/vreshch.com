FROM node:26-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG COMMIT_SHA="" BRANCH="" BUILD_TIME=""
RUN echo "{\"commit\":\"${COMMIT_SHA}\",\"branch\":\"${BRANCH}\",\"buildTime\":\"${BUILD_TIME}\"}" > public/version.json
RUN npm run build

FROM node:26-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

# ARGs don't cross stage boundaries; redeclare so /health reads real provenance
# at runtime instead of the kit's 0.0.0-dev/dev fallback.
ARG COMMIT_SHA="" BUILD_TIME=""
ENV COMMIT_SHA=$COMMIT_SHA
ENV BUILD_TIME=$BUILD_TIME

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
