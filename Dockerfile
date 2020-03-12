FROM node:12

MAINTAINER Mobapi "contact@mobapi.com"

RUN mkdir /app

COPY package.json /app
COPY *.js /app
ADD node_modules/ /app/node_modules/

CMD ["node", "/app"]
