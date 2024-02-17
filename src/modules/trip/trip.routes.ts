import { FastifyInstance } from "fastify";
import { createTripSchema, getAllTripsSchema, getTripByIdSchema } from "./trip.schema";
import { createTripHandler, getAllTripsHandler, getTripByIdHandler } from "./trip.controllers";

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

    // server.delete(
    //     '/delete/:id',
    //     {},
    //     () => { }
    // )

}

export default tripRoutes;