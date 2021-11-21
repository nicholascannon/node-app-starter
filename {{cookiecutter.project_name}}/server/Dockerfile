FROM node:16.7.0-alpine AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --quite

COPY .prettierrc .
COPY .eslintrc.js .
COPY tsconfig*.json ./
COPY src src

RUN npm run lint
RUN npm run test
RUN npm run build

RUN npm prune --production

FROM node:16.7.0-alpine AS runtime
WORKDIR /usr/src/app

# don't want node process as PID 1, use this instead
RUN apk add dumb-init

COPY --from=build /usr/src/app/dist dist/
COPY --from=build /usr/src/app/node_modules node_modules/

USER node

ARG VERSION
ENV VERSION=${VERSION}

ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}

ENV NODE_ENV=production

CMD [ "dumb-init", "node", "./dist/index.js" ]
