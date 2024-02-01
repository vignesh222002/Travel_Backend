import { FastifyInstance } from "fastify";
import { createPlaceHandler, getAllPlacesHandler, updatePlaceHandler } from "./place.controllers";
import { UpdatePlaceSchema, createPlaceSchema, getPlaceByIdSchema } from "./place.schema";

async function placeRoutes(server: FastifyInstance) {
    server.get(
        '/all',
        getAllPlacesHandler
    )

    server.get(
        '/:id',
        {
            schema: getPlaceByIdSchema
        },
        () => {}
    )

    server.post(
        '/create',
        {
            schema: createPlaceSchema
        },
        createPlaceHandler
    )

    server.put(
        '/update',
        {
            schema: UpdatePlaceSchema
        },
        updatePlaceHandler
    )
}

export default placeRoutes;