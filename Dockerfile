FROM node:12-slim

MAINTAINER Mobapi "contact@mobapi.com"

RUN mkdir /app

COPY package.json /app
COPY *.js /app

WORKDIR /app
RUN npm install

CMD ["node", "/app"]
