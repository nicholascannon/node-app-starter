FROM node:16.7.0-alpine AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --quite

COPY src src
COPY .prettierrc .
COPY .eslintrc.js .
COPY tsconfig*.json ./

RUN npm run lint
RUN npm run test
RUN npm run build

RUN npm prune --production

FROM node:16.7.0-alpine AS runtime
WORKDIR /usr/src/app

# don't want node process as PID, use this instead
RUN apk add dumb-init

COPY --from=build /usr/src/app/dist dist/
COPY --from=build /usr/src/app/node_modules node_modules/
COPY --from=build /usr/src/app/package.json .

USER node

ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}

ENV NODE_ENV=production

CMD [ "dumb-init", "node", "./dist/index.js" ]
