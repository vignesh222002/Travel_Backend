import { Prisma } from "@prisma/client";
import prisma from "../../utils/prismaClient";

export async function getAllSpotsByPlace(place_id: number) {
    return await prisma.spots.findMany({
        where: {
            place_id
        },
    })
}

export async function addSpot(data: Prisma.SpotsCreateManyInput) {
    return await prisma.spots.create({ data })
}

export async function updateSpot(data: Prisma.SpotsCreateManyInput) {
    return await prisma.spots.update({
        where: {
            id: data.id,
            place_id: data.place_id
        },
        data
    })
}

export async function deleteSpot(place_id: number, spot_id: number) {
    return await prisma.spots.delete({
        where: {
            place_id,
            id: spot_id,
        }
    })
}