import Fastify from "fastify";
import { config } from "dotenv";
import stateRoutes from "./src/modules/state/state.routes";
import placeRoutes from "./src/modules/place/place.routes";

config();

const server = Fastify({
    logger: true
});

// Routes

server.register(stateRoutes, { prefix: 'api/state' })
server.register(placeRoutes, { prefix: 'api/place' })

try {
    server.listen({ port: +(process.env.PORT || 4000) }, (error, address) => {
        if (error) {
            console.log("Error", error)
        }
    })
}
catch (error) {
    server.log.error(error)
    process.exit(1)
}