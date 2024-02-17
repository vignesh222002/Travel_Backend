import { FastifyInstance } from "fastify";
import { createTripSchema, getAllTripsSchema } from "./trip.schema";
import { createTripHandler, getAllTripsHandler } from "./trip.controllers";

async function tripRoutes(server: FastifyInstance) {
    server.get(
        '/all',
        { schema: getAllTripsSchema },
        getAllTripsHandler
    )

    // server.get(
    //     '/:id',
    //     {},
    //     () => { }
    // )

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