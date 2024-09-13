import { db } from "../database";
import Boom from "@hapi/boom";

export const addViewToListingRoute = {
  method: "POST",
  path: "/api/listings/{id}/add-view",
  handler: async (request, h) => {
    const id = request.params.id;
    const { results } = await db.query(
      "UPDATE listings SET views = views + 1 WHERE id = ?",
      [id]
    );
    if (results.affectedRows === 0) {
      throw Boom.notFound(`Listing with id ${id} not found`);
    }
    const { results: updatedResults } = await db.query(
      "SELECT * FROM listings WHERE id = ?",
      [id]
    );
    const listing = updatedResults[0];
    return h.response(listing).code(200);
  },
};
