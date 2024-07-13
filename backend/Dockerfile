FROM node:21.6.2-alpine3.19

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp

WORKDIR /app

COPY package*.json ./

RUN npm i


COPY src ./src
COPY tsconfig.json ./tsconfig.json

CMD npm start