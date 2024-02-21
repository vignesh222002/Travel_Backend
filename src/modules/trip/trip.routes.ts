import { FastifyInstance } from "fastify";
import { createTripSchema, deleteTripSchema, editTripSchema, getAllTripsSchema, getTripByIdSchema } from "./trip.schema";
import { createTripHandler, deleteTripHandler, editTripHandler, getAllTripsHandler, getTripByIdHandler } from "./trip.controllers";

async function tripRoutes(server: FastifyInstance) {
    server.get(
        '/all',
        { schema: getAllTripsSchema },
        getAllTripsHandler
    )

    server.get(
        '/:id',
        { schema: getTripByIdSchema },
        getTripByIdHandler
    )

    server.post(
        '/create',
        { schema: createTripSchema },
        createTripHandler
    )

    server.put(
        '/update/:id',
        { schema: editTripSchema },
        editTripHandler
    )

    server.delete(
        '/delete/:id',
        { schema: deleteTripSchema },
        deleteTripHandler
    )

}

export default tripRoutes;