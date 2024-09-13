import { db } from "../database";
import * as admin from "firebase-admin";
import Boom from "@hapi/boom";

export const deleteListingRoute = {
  method: "DELETE",
  path: "/api/listings/{id}",
  handler: async (request, h) => {
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

    const id = request.params.id;
    const { results } = await db.query(
      "SELECT  user_id FROM listings WHERE id = ?",
      [id]
    );
    const listing = results[0];

    if (!listing) {
      throw Boom.notFound(`Listing with id ${id} not found`);
    }

    if (listing.user_id !== user.uid) {
      throw Boom.forbidden(
        "User does not have permission to delete this listing"
      );
    }
    try {
      await db.query("DELETE FROM listings WHERE id=? AND user_id=?", [
        id,
        user.uid,
      ]);
    } catch (error) {
      throw Boom.badImplementation("Error deleting listing");
    }

    return { message: "Listing deleted successfully" };
  },
};
