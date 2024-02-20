import { FastifyInstance } from "fastify";
import { createTripSchema, deleteTripSchema, getAllTripsSchema, getTripByIdSchema } from "./trip.schema";
import { createTripHandler, deleteTripHandler, getAllTripsHandler, getTripByIdHandler } from "./trip.controllers";

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

    // server.put(
    //     '/update/:id',
    //     {},
    //     () => { }
    // )

    server.delete(
        '/delete/:id',
        { schema: deleteTripSchema },
        deleteTripHandler
    )

}

export default tripRoutes;