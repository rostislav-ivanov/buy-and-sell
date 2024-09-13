import Boom from "@hapi/boom";
import { db } from "../database";
//import { fakeListings } from "./fake-data";

export const getListingRoute = {
  method: "GET",
  path: "/api/listings/{id}",
  handler: async (request, h) => {
    const id = request.params.id;
    try {
      const { results } = await db.query(
        "SELECT * FROM listings WHERE id = ?",
        [id]
      );
      const listing = results[0];
      if (!listing) {
        throw Boom.notFound(`Listing with id ${id} not found`);
      }
      return h.response(listing).code(200);
    } catch (error) {
      throw Boom.badImplementation("Error retrieving listings");
    }
  },
};
