import { FastifyInstance } from "fastify";
import { createStateSchema, updateStateSchema } from "./state.schema";
import { createStateHandler, getAllStatesHandler, updateStateHandler } from "./state.controller";

async function stateRoutes(server: FastifyInstance) {
    server.get(
        '/all',
        {
            schema: { tags: ['State'] }
        },
        getAllStatesHandler
    )

    server.post(
        '/create',
        {
            schema: createStateSchema
        },
        createStateHandler
    )

    server.put(
        '/update',
        {
            schema: updateStateSchema
        },
        updateStateHandler
    )
}

export default stateRoutes;