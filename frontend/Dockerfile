FROM node:21.6.2-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY src ./src
COPY public ./public

COPY tsconfig.json ./tsconfig.json
COPY next-env.d.ts ./next-env.d.ts
COPY *.config.ts ./
COPY *.config.js ./
COPY postcss.config.mjs ./postcss.config.mjs

ARG NEXT_PUBLIC_GRAPHQL_API_URL
ENV NEXT_PUBLIC_GRAPHQL_API_URL ${NEXT_PUBLIC_GRAPHQL_API_URL}

ARG NEXT_PUBLIC_UPLOAD_API_ENDPOINT
ENV NEXT_PUBLIC_UPLOAD_API_ENDPOINT ${NEXT_PUBLIC_UPLOAD_API_ENDPOINT}

CMD npm run dev