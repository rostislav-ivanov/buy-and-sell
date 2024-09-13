import * as admin from "firebase-admin";
import Boom from "@hapi/boom";
import { v4 as uuid } from "uuid";
import { db } from "../database";

export const createNewListingRoute = {
  method: "POST",
  path: "/api/listings",
  handler: async (request, h) => {
    const token = request.headers.authtoken;
    const user = await admin.auth().verifyIdToken(token);

    if (!user.uid) {
      throw Boom.unauthorized("User ID does not match");
    }

    const { name, description, price } = request.payload;

    if (!name || !description || !price) {
      return h.response({ error: "Missing required information" }).code(400);
    }

    const id = uuid();
    const views = 0;

    await db.query(
      "INSERT INTO listings (id, name, description, price, user_id, views) VALUES (?, ?, ?, ?, ?, ?)",
      [id, name, description, price, user.uid, views]
    );

    return { id, name, description, price, user_id: user.uid, views };
  },
};
