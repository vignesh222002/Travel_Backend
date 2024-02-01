import { FastifyReply, FastifyRequest } from "fastify";
import { IUpdateState } from "./state.schema";
import { createState, getAllStates, updateState } from "./state.services";
import { Prisma } from "@prisma/client";

export async function getAllStatesHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const states = await getAllStates()

        return reply.code(200).send({
            status: true,
            data: states
        })
    }
    catch (error) {
        console.log("Get All State Error", error);
        reply.code(500).send(error);
    }
}

export async function createStateHandler(
    request: FastifyRequest<{
        Body: Prisma.StatesCreateManyInput
    }>,
    reply: FastifyReply
) {
    try {
        const state = request.body.state;

        const createdState = await createState(state)

        return reply.code(201)
            .send({
                status: true,
                message: "State Created Sucessfully",
                data: createdState,
            })
    }
    catch (error) {
        console.log("Create State Error", error);
        reply.code(500).send(error);
    }
}

export async function updateStateHandler(
    request: FastifyRequest<{
        Body: IUpdateState
    }>,
    reply: FastifyReply
) {
    try {
        const { id, state } = request.body;

        const updatedState = await updateState(id, state)

        return reply.code(201)
            .send({
                status: true,
                message: "State Updated Sucessfully",
                data: updatedState,
            })
    }
    catch (error) {
        console.log("Update State Error", error);
        reply.code(500).send(error);
    }
}