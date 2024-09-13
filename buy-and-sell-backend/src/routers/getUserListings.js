import * as admin from "firebase-admin";
import { db } from "../database";
import Boom from "@hapi/boom";

export const getUserListingsRoute = {
  method: "GET",
  path: "/api/users/listings",
  handler: async (request, h) => {
    if (!request.headers.authtoken) {
      throw Boom.unauthorized("User must be logged in to view listings");
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
      const { results } = await db.query(
        "SELECT * FROM listings WHERE user_id = ?",
        [user.uid]
      );
      return results;
    } catch (error) {
      throw Boom.badImplementation("Error retrieving listings");
    }
  },
};
