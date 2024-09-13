import Hapi from "@hapi/hapi";
import * as admin from "firebase-admin";
import routers from "./routers";
import { db } from "./database";
import credentials from "../credentials.json";
import dotenv from "dotenv";
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

let server;

const start = async () => {
  server = Hapi.server({
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Content-Type", "authtoken"],
        credentials: true,
      },
    },
  });

  routers.forEach((route) => {
    server.route(route);
  });

  db.connect();

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

process.on("SIGINT", async () => {
  console.log("stopping hapi server");
  await server.stop({ timeout: 10000 });
  db.end();
  console.log("hapi server stopped");
  process.exit(0);
});

start();
