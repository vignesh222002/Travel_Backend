import { Prisma } from "@prisma/client";
import prisma from "../../utils/prismaClient";
import { getAllTripsResponseFormatter } from "./trip.helper";
import { getAllTripsResponse } from "./trip.interfaces";

export async function createTrip(data: Prisma.TripsCreateManyInput & Prisma.Trip_daysCreateManyInput) {
    return await prisma.trips.create({
        data: {
            Trip_days_ref: {
                createMany: {
                    data: data
                }
            }
        }
    })
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