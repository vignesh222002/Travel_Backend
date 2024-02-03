import { FastifyInstance } from "fastify";
import { addSpotSchema, deleteSpotSchema, updateSpotSchema } from "./spot.schema";
import { addSpotHandler, deleteSpotHandler, updateSpotHandler } from "./spot.controller";

async function spotRoutes(server: FastifyInstance) {
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