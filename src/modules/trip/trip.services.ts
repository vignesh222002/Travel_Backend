import { Prisma } from "@prisma/client";
import prisma from "../../utils/prismaClient";
import { getAllTripsResponseFormatter, getTripByIdRawData, getTripsByIdResponseFormatter } from "./trip.helper";
import { places_visited } from "./trip.interfaces";

export async function createTrip(
    trip_name: string,
    members: string,
    amount_spend: number,
    description: string,
    places_visited: number[],
    data: Prisma.TripsCreateManyInput & Prisma.Trip_daysCreateManyInput
) {

    return await prisma.$transaction([
        prisma.places.updateMany({
            where: {
                id: {
                    in: places_visited
                }
            },
            data: {
                is_visited: true,
                count: {
                    increment: 1
                }
            }
        }),

        prisma.trips.create({
            data: {
                trip_name,
                amount_spend,
                members,
                description,
                Trip_days_ref: {
                    createMany: {
                        data
                    }
                }
            }
        })
    ])
}

export async function editTrip(
    id: number,
    trip_name: string,
    members: string,
    amount_spend: number,
    description: string,
    places_visited: {
        added: places_visited[];
        deleted: places_visited[];
    },
    delete_trip_spots: number[],
    data: Prisma.Trip_daysCreateManyInput[]
) {

    const newTripSpots = data.filter((item: Prisma.Trip_daysCreateManyInput) => item.id === 0)
    newTripSpots.map((item: Prisma.Trip_daysCreateManyInput) => ({
        date: item.date,
        place_id: item.place_id,
        spot_id: item.spot_id,
        order: item.order,
        description: item.description
    }))
    const updateTripSpots = data.filter((item: Prisma.Trip_daysCreateManyInput) => item.id !== 0)

    return await prisma.$transaction([
        ...places_visited.added.map(item => prisma.places.update({
            where: {
                id: item.place_id
            },
            data: {
                count: item.count <= 0 ? 1 : item.count + 1,
                is_visited: item.count + 1 ? true : false
            }
        })),

        ...places_visited.deleted.map(item => prisma.places.update({
            where: {
                id: item.place_id
            },
            data: {
                count: item.count <= 0 ? 0 : item.count - 1,
                is_visited: item.count - 1 ? true : false
            }
        })),

        prisma.trips.update({
            where: {
                id
            },
            data: {
                trip_name,
                members,
                amount_spend,
                description,
                Trip_days_ref: {
                    // Create New Spots
                    createMany: {
                        data: newTripSpots?.map((item: Prisma.Trip_daysCreateManyInput) => ({
                            ...item
                        }))
                    },

                    // Update Existing Spots
                    updateMany: updateTripSpots?.map((item: Prisma.Trip_daysCreateManyInput) => ({
                        where: {
                            id: item.id,
                        },
                        data: item
                    })),

                    // Delete Existing Spots
                    deleteMany: {
                        id: {
                            in: delete_trip_spots
                        }
                    }
                }
            }
        })
    ])
}

export async function getAllTrips() {
    const result: any = await prisma.trips.findMany({
        include: {
            Trip_days_ref: {
                select: {
                    date: true,
                    id: true,
                    order: true,
                    place_ref: {
                        select: {
                            id: true,
                            place: true,
                            count: true,
                            image_link: true,
                        },
                    }
                },
                orderBy: {
                    order: 'asc'
                }
            }
        }
    })

    return getAllTripsResponseFormatter(result)
}

export async function getTripById(id: number, raw_data?: boolean) {
    const result: any = await prisma.trips.findUnique({
        where: {
            id
        },
        include: {
            Trip_days_ref: {
                select: {
                    id: true,
                    date: true,
                    order: true,
                    description: true,
                    place_ref: {
                        select: {
                            id: true,
                            place: true,
                            count: true,
                        }
                    },
                    spots_ref: {
                        select: {
                            id: true,
                            spot: true,
                            category: true,
                            image_link: true,
                            google_location: true,
                            must_visit: true,
                        }
                    }
                },
                orderBy: {
                    order: 'asc'
                }
            }
        }
    })

    if (raw_data) {
        return getTripByIdRawData(result)
    }

    return getTripsByIdResponseFormatter(result)
}

export async function deleteTrip(id: number, places_visited: places_visited[]) {

    return await prisma.$transaction([
        ...places_visited.map(item => prisma.places.update({
            where: {
                id: item.place_id
            },
            data: {
                count: item.count <= 0 ? 0 : item.count - 1,
                is_visited: item.count - 1 ? true : false
            }
        })),

        prisma.trips.delete({
            where: {
                id
            }
        })
    ])
}