FROM node:24.1 AS base
WORKDIR /opt/botbuilder/app
ADD package.json .
ADD package-lock.json .
ADD src ./src
RUN npm ci

FROM base AS dev
CMD ["npm", "run", "start-dev"]

FROM base AS prod
CMD ["npm", "run", "start"]