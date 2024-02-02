import { Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { addSpot, deleteSpot, updateSpot } from "./spot.services";

export async function addSpotHandler(
    request: FastifyRequest<{
        Body: Prisma.SpotsCreateManyInput
    }>,
    reply: FastifyReply
) {
    try {
        const body = request.body;

        const result = await addSpot(body)

        reply.code(201).send({
            status: true,
            message: "Spot Created Sucessfully",
            data: result
        })
    }
    catch (error) {
        console.log("Add Spot Error", error)
        reply.code(500).send({
            status: false,
            error
        });
    }
}

export async function updateSpotHandler(
    request: FastifyRequest<{
        Body: Prisma.SpotsCreateManyInput
    }>,
    reply: FastifyReply
) {
    try {
        const body = request.body;

        const result = await updateSpot(body)

        reply.code(200).send({
            status: true,
            message: "Spot Updated Sucessfully",
            data: result
        })
    }
    catch (error) {
        console.log("Update Spot Error", error)
        reply.code(500).send({
            status: false,
            error
        });
    }
}

export async function deleteSpotHandler(
    request: FastifyRequest<{
        Params: { spot_id: number, place_id: number }
    }>,
    reply: FastifyReply
) {
    try {
        const { place_id, spot_id } = request.params;

        const result = await deleteSpot(place_id, spot_id)

        reply.code(200).send({
            status: true,
            message: "Spot Deleted Sucessfully",
            data: result
        })
    }
    catch (error) {
        console.log("Delete Spot Error", error)
        reply.code(500).send({
            status: false,
            error
        });
    }
}