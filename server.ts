import Fastify from "fastify";
import { config } from "dotenv";
import stateRoutes from "./src/modules/state/state.routes";
import placeRoutes from "./src/modules/place/place.routes";
import fastifySwagger from "@fastify/swagger";
import swaggerConfig from "./src/utils/swagger.config";
import fastifySwaggerUi from "@fastify/swagger-ui";
import spotRoutes from "./src/modules/spot/spot.routers";

config();

const server = Fastify({
    logger: true
});

// Swagger

server.register(fastifySwagger, swaggerConfig)
server.register(fastifySwaggerUi)

// Routes

server.register(stateRoutes, { prefix: 'api/state' })
server.register(placeRoutes, { prefix: 'api/place' })
server.register(spotRoutes, { prefix: 'api/spot' })

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