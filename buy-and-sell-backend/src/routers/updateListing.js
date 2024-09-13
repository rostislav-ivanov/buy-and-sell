import { db } from "../database";
import * as admin from "firebase-admin";
import Boom from "@hapi/boom";

export const updateListingRoute = {
  method: "POST",
  path: "/api/listings/{id}",
  handler: async (request, h) => {
    const { id } = request.params;
    const { name, description, price } = request.payload;
    if (!request.headers.authtoken) {
      throw Boom.unauthorized("User must be logged in to delete a listing");
    }

    const token = request.headers.authtoken;
    let user;
    try {
      user = await admin.auth().verifyIdToken(token);
    } catch (error) {
      throw Boom.unauthorized("Invalid  auth token");
    }

    if (!user.uid) {
      throw Boom.unauthorized("User ID does not match");
    }
    try {
      const { result } = await db.query(
        "UPDATE listings SET name=?, description=?, price=? WHERE id=? AND user_id=?",
        [name, description, price, id, user.uid]
      );
      return { id, name, description, price, user_id: user.uid };
    } catch (error) {
      throw Boom.badImplementation("Error updating listing");
    }
  },
};
