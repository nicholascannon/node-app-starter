FROM node:16.7.0-alpine AS base

FROM base AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --quite

COPY tsconfig*.json ./
COPY src src
COPY test test

RUN npm run format:check
RUN npm run test
RUN npm run build

RUN npm prune --production

FROM base AS runtime
WORKDIR /opt/app

# don't want node process as PID 1, use this instead
RUN apk add dumb-init

COPY --from=build /usr/src/app/package* ./
COPY --from=build /usr/src/app/dist dist/
COPY --from=build /usr/src/app/node_modules node_modules/

USER node

ARG VERSION
ENV VERSION=${VERSION}
ENV NODE_ENV=production

CMD [ "dumb-init", "node", "." ]
