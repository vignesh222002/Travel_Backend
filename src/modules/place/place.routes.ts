import { FastifyInstance } from "fastify";
import { createPlaceHandler, deletePlaceHandler, getAllPlacesHandler, getPlaceByIdHandler, updatePlaceHandler } from "./place.controllers";
import { updatePlaceSchema, createPlaceSchema, getPlaceByIdSchema, deletePlaceSchema } from "./place.schema";

async function placeRoutes(server: FastifyInstance) {
    server.get(
        '/all',
        { schema: { tags: ['Place'] } },
        getAllPlacesHandler
    )

    server.get(
        '/:id',
        {
            schema: getPlaceByIdSchema
        },
        getPlaceByIdHandler
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
            schema: updatePlaceSchema
        },
        updatePlaceHandler
    )

    server.delete(
        '/delete/:id',
        {
            schema: deletePlaceSchema
        },
        deletePlaceHandler
    )
}

export default placeRoutes;