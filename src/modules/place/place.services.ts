import { Prisma } from "@prisma/client";
import prisma from "../../utils/prismaClient";

export async function getAllPlaces() {
    return await prisma.places.findMany({
        include: {
            nearest_place_ref: {
                select: {
                    nearest_place: true
                }
            },
            state: {
                select:{
                    state: true,
                }
            }
        }
    })
}

export async function getPlaceById(id: number) {
    return await prisma.places.findUnique({
        where: {
            id
        },
        include: {
            spots: true
        }
    })
}

export async function createPlace(data: Prisma.PlacesCreateManyInput & Prisma.Nearest_placeCreateManyInput) {

    return prisma.places.create({
        data: {
            place: data.place,
            state_id: data.state_id,
            landscape: data.landscape,
            is_visited: data.is_visited,
            is_oneday_trip: data.is_oneday_trip,
            stay_option: data.stay_option,
            best_time_to_visit: data.best_time_to_visit,
            nearest_place_ref: {
                create: {
                    nearest_place: data.nearest_place,
                }
            }
        }
    })
}

export async function updatePlace(data: Prisma.PlacesCreateManyInput & Prisma.Nearest_placeCreateManyInput) {

    return await prisma.places.update({
        where: { id: data.id },
        data: {
            id: data.id,
            place: data.place,
            state_id: data.state_id,
            landscape: data.landscape,
            is_visited: data.is_visited,
            is_oneday_trip: data.is_oneday_trip,
            stay_option: data.stay_option,
            best_time_to_visit: data.best_time_to_visit,
            nearest_place_ref: {
                upsert: {
                    where: {
                        place_id: data.id,
                    },
                    update: {
                        nearest_place: data.nearest_place,
                    },
                    create: {
                        nearest_place: data.nearest_place,
                    },
                }
            }
        }
    })
}

export async function deletePlace(id: number) {
    return await prisma.places.delete({
        where: {
            id
        }
    })
}