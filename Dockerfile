FROM node:12

ENV APP_WORKDIR=/usr/src/app/

COPY package.json package-lock.json ormconfig.js $APP_WORKDIR
WORKDIR $APP_WORKDIR

RUN npm ci
COPY tsconfig.json tsconfig.build.json $APP_WORKDIR
COPY src $APP_WORKDIR/src
RUN npm run build

RUN rm -rf tsconfig.json src
RUN npm prune --production

EXPOSE 3000
ENTRYPOINT ["node", "dist/main.js"]