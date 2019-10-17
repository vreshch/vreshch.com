# create a file named Dockerfile
FROM mhart/alpine-node:12.12.0
RUN apk add --no-cache curl
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . /app
RUN npm run build
EXPOSE 8080
HEALTHCHECK --interval=5s --timeout=3s CMD curl --fail http://localhost:8010/hc || exit 1
CMD ["node", "dist/backend/run.js"]
