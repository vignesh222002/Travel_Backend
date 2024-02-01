import prisma from "../../utils/prismaClient";

export async function getAllStates() {
    return await prisma.states.findMany();
}

export async function createState(input: string) {
    return await prisma.states.create({
        data: {
            state: input,
        }
    })
}

export async function updateState(id: number, state: string) {
    return await prisma.states.update({
        where: { id },
        data: { state }
    })
}