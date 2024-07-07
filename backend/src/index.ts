import "reflect-metadata";
import db from "./db";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";

import schema from "./schema";
import env from "./env";

const app = express();
const httpServer = http.createServer(app);

const { SERVER_PORT: port, CORS_ALLOWED_ORIGINS: corsAllowed } = env;

const main = async () => {
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // console.log(server);
  await db.initialize().catch((e) => console.log("db.initialize()", e));

  await server.start().catch((e) => console.log("server.start()", e));

  app.use(
    "/",
    cors<cors.CorsRequest>({
      credentials: true,
      origin: corsAllowed.split(","),
    }),

    express.json(),

    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  await new Promise<void>((resolve) => httpServer.listen(port, resolve)).catch(
    (e) => console.log("httpServer.listen", e)
  );

  console.log(`🚀 Hey, server ready at http://localhost:${port}`);
};

main();
