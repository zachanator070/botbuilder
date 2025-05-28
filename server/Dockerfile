FROM node:24.1 as base
WORKDIR /opt/botbuilder/server

FROM base as dev
CMD ["npm", "run", "start-dev"]

FROM base as prod
CMD ["npm", "run", "start"]