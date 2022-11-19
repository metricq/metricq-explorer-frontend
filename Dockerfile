FROM node:lts as build-stage

RUN yarn config set logFilters --json '{ code: "YN0013", level: "discard" }'

WORKDIR /app
COPY yarn.lock package.json ./
RUN YARN_CHECKSUM_BEHAVIOR=ignore yarn install
COPY src src/
COPY public public/
COPY .eslintrc babel.config.js vue.config.js ./

ARG METRICQ_WIZARD_BACKEND=http://metricq-wizard/
ENV VUE_APP_METRICQ_WIZARD_BACKEND=${METRICQ_WIZARD_BACKEND}

RUN NODE_OPTIONS=--openssl-legacy-provider yarn build

FROM nginx:mainline-alpine as production-stage

ENV METRICQ_WIZARD_BACKEND=

COPY ./docker/50-wizard-backend.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/50-wizard-backend.sh
COPY --from=build-stage /app/dist /usr/share/nginx/html/
