FROM node:25-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG COMMIT_SHA="" BRANCH="" BUILD_TIME=""
RUN echo "{\"commit\":\"${COMMIT_SHA}\",\"branch\":\"${BRANCH}\",\"buildTime\":\"${BUILD_TIME}\"}" > public/version.json
RUN npm run build

FROM node:25-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
