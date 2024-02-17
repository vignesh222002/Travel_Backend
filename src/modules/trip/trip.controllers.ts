import { Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { createTrip, getAllTrips, getTripById } from "./trip.services";

export const createTripHandler = async (
    request: FastifyRequest<{
        Body: {
            data: Prisma.TripsCreateManyInput & Prisma.Trip_daysCreateManyInput
        }
    }>,
    reply: FastifyReply
) => {
    try {
        const result = await createTrip(request.body.data)

        return reply.code(200)
            .send({
                status: true,
                data: result
            })
    }
    catch (error) {
        console.log("Create Trip Error", error);
        reply.code(500).send({
            status: false,
            error
        });
    }
}

export const getAllTripsHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const result = await getAllTrips()

        return reply.code(200)
            .send({
                status: true,
                data: result
            })
    }
    catch (error) {
        console.log("Get All Trip Error", error);
        reply.code(500).send({
            status: false,
            error
        });
    }
}

export const getTripByIdHandler = async (
    request: FastifyRequest<{
        Params: {
            id: number
        }
    }>,
    reply: FastifyReply
) => {
    try {
        const result = await getTripById(request.params.id)
        return reply.code(200)
            .send({
                status: true,
                data: result
            })
    }
    catch (error) {
        console.log("Get Trip By Id Error", error);
        reply.code(500).send({
            status: false,
            error
        });
    }
}