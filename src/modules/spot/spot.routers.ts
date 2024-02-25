import { FastifyInstance } from "fastify";
import { addSpotSchema, deleteSpotSchema, getAllSpotsByPlaceSchema, updateSpotSchema } from "./spot.schema";
import { addSpotHandler, deleteSpotHandler, getAllSpotsByPlaceHandler, updateSpotHandler } from "./spot.controller";

async function spotRoutes(server: FastifyInstance) {
    server.get(
        '/spot/all/:place_id',
        { schema: getAllSpotsByPlaceSchema },
        getAllSpotsByPlaceHandler
    )

    server.post(
        '/add',
        {
            schema: addSpotSchema
        },
        addSpotHandler
    )

    server.put(
        '/update',
        {
            schema: updateSpotSchema
        },
        updateSpotHandler
    )

    server.delete(
        '/delete/:spot_id/place_id/:place_id',
        {
            schema: deleteSpotSchema
        },
        deleteSpotHandler
    )
}

export default spotRoutes;