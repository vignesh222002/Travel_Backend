import Fastify from "fastify";
import { config } from "dotenv";

config();

const PORT = 4000

const server = Fastify();

try {
    server.listen({ port: PORT }, (error, address) => {
        if (error) {
            console.log("Error", error)
        }
    })
}
catch (error) {
    server.log.error(error)
    process.exit(1)
}