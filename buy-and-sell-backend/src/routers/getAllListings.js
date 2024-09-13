import { db } from "../database";
import Boom from "@hapi/boom";

export const getAllListingsRoute = {
  method: "GET",
  path: "/api/listings",
  handler: async (request, h) => {
    try {
      const { results } = await db.query("SELECT * FROM listings");
      return results;
    } catch (error) {
      throw Boom.badImplementation("Error retrieving listings");
    }
  },
};
