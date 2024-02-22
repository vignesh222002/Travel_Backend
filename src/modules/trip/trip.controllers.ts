import { Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { createTrip, deleteTrip, editTrip, getAllTrips, getTripById } from "./trip.services";
import { places_visited } from "./trip.interfaces";
import { compare_places } from "./trip.helper";

export const createTripHandler = async (
    request: FastifyRequest<{
        Body: {
            trip_name: string,
            members: string,
            amount_spend: number,
            description: string,
            places_visited: number[],
            data: Prisma.TripsCreateManyInput & Prisma.Trip_daysCreateManyInput
        }
    }>,
    reply: FastifyReply
) => {
    try {
        const result = await createTrip(
            request.body.trip_name,
            request.body.members,
            request.body.amount_spend,
            request.body.description,
            request.body.places_visited,
            request.body.data
        )

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

export const editTripHandler = async (
    request: FastifyRequest<{
        Body: {
            id: number,
            trip_name: string,
            members: string,
            amount_spend: number,
            description: string,
            new_places_visited: places_visited[],
            old_places_visited: places_visited[],
            data: Prisma.Trip_daysCreateManyInput[]
        }
    }>,
    reply: FastifyReply
) => {
    try {
        const places_visited = compare_places(request.body.old_places_visited, request.body.new_places_visited)

        const result = await editTrip(
            request.body.id,
            request.body.trip_name,
            request.body.members,
            request.body.amount_spend,
            request.body.description,
            places_visited,
            request.body.data,
        )

        return reply.code(200)
            .send({
                status: true,
                data: result
            })
    }
    catch (error) {
        console.log("Edit Trip Error", error);
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

export const deleteTripHandler = async (
    request: FastifyRequest<{
        Params: {
            id: number
        },
        Body: {
            places_visited: places_visited[]
        }
    }>,
    reply: FastifyReply
) => {
    try {
        const result = await deleteTrip(request.params.id, request.body.places_visited)
        return reply.code(200)
            .send({
                status: true,
                data: result
            })
    }
    catch (error) {
        console.log("Delete Trip Error", error);
        reply.code(500).send({
            status: false,
            error
        });
    }
}