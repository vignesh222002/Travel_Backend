import { FastifyReply, FastifyRequest } from "fastify";
import { createPlace, deletePlace, getAllPlaces, getPlaceById, updatePlace } from "./place.services";
import { Prisma } from "@prisma/client";

export async function getAllPlacesHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const result = await getAllPlaces()

        return reply.code(200)
            .send({
                status: true,
                data: result
            })
    }
    catch (error: any) {
        console.log("Get All Place Error", error);
        reply.code(500).send({
            status: false,
            error
        });
    }
}

export async function getPlaceByIdHandler(
    request: FastifyRequest<{
        Params: { id: number }
    }>,
    reply: FastifyReply
) {
    try {
        const id = request.params.id

        const result = await getPlaceById(id)

        return reply.code(200)
            .send({
                status: true,
                data: result
            })
    }
    catch (error: any) {
        console.log("Get Place By Id Error", error);
        reply.code(500).send({
            status: false,
            error
        });
    }
}

export async function createPlaceHandler(
    request: FastifyRequest<{
        Body: Prisma.PlacesCreateManyInput & Prisma.Nearest_placeCreateManyInput
    }>,
    reply: FastifyReply
) {
    try {
        const body = request.body;

        const result = await createPlace(body)

        return reply.code(201)
            .send({
                status: true,
                message: "Place Created Sucessfully",
                data: result
            })
    }
    catch (error: any) {
        console.log("Create Place Error", error);
        reply.code(500).send({
            status: false,
            error
        });
    }
}

export async function updatePlaceHandler(
    request: FastifyRequest<{
        Body: Prisma.PlacesCreateManyInput & Prisma.Nearest_placeCreateManyInput
    }>,
    reply: FastifyReply
) {
    try {
        const body = request.body;

        const result = await updatePlace(body)

        return reply.code(201).send({
            status: true,
            message: "Place Updated Sucessfully",
            data: result
        })
    }
    catch (error: any) {
        console.log("Update Place Error", error);
        reply.code(500).send({
            status: false,
            error
        });
    }
}

export async function deletePlaceHandler(
    request: FastifyRequest<{
        Params: { id: number }
    }>,
    reply: FastifyReply
) {
    try {
        const id = request.params.id;

        const result = await deletePlace(id)

        return reply.code(200).send({
            status: true,
            message: "Place Deleted Sucessfully",
            data: result
        })
    }
    catch (error: any) {
        console.log("Delete Place Error", error);
        reply.code(500).send({
            status: false,
            error
        });
    }
}