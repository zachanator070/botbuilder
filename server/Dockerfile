FROM node:24.1 as base
WORKDIR /opt/botbuilder/server
ADD package.json .
ADD package-lock.json .

FROM base AS dev-modules
RUN npm ci

FROM dev-modules AS dev
CMD ["npm", "run", "start-dev"]

FROM dev-modules AS prod-builder
ADD src ./src
ADD tsconfig.json .
RUN npm run build

FROM base AS prod-modules
RUN npm ci --omit=dev

FROM base AS prod
ADD assets ./assets
ADD public ./public
COPY --from=prod-builder /opt/botbuilder/server/build ./build
COPY --from=prod-modules /opt/botbuilder/server/node_modules ./node_modules
CMD ["npm", "run", "start"]