FROM node:24.1 as base
WORKDIR /opt/botbuilder/app

FROM base as dev
ADD package.json .
ADD package-lock.json .
RUN npm ci
CMD ["npm", "run", "start-dev"]

FROM base as prod
ADD package.json .
ADD package-lock.json .
RUN npm ci --omit=dev
CMD ["npm", "run", "start"]