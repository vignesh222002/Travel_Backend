import { Prisma } from "@prisma/client";
import prisma from "../../utils/prismaClient";
import { getAllTripsResponseFormatter, getTripsByIdResponseFormatter } from "./trip.helper";
import { places_visited } from "./trip.interfaces";

export async function createTrip(
    trip_name: string,
    members: string,
    amout_spend: number,
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
                amout_spend,
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
    amout_spend: number,
    description: string,
    places_visited: {
        deleted: places_visited[];
        added: places_visited[];
    },
    data: Prisma.Trip_daysCreateManyInput[]
) {
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
                amout_spend,
                description,
                Trip_days_ref: {
                    updateMany: data?.map((item: Prisma.Trip_daysCreateManyInput) => ({
                        where: {
                            id: item.id
                        },
                        data: item
                    }))
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

export async function getTripById(id: number) {
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

// {
//     "trip_name": "Trip Name",
//     "members": "Me,Deepak,Testing",
//     "amout_spend": 2000,
//     "description": "Testing Create Trip",
//     "places_visited": [
//       6, 7
//     ],
//     "data": [
//       {
//         "date": "Mon Feb 19 2024 16:47:41 GMT+0530",
//         "spot_id": 2,
//         "place_id": 6,
//         "order": 1,
//         "description": "First Day Starts in Ooty"
//       },
//       {
//         "date": "Mon Feb 19 2024 16:47:41 GMT+0530",
//         "spot_id": 1,
//         "place_id": 7,
//         "order": 2,
//         "description": "Then Go to Kodai in the First Day"
//       },
//       {
//         "date": "Mon Feb 19 2024 16:47:41 GMT+0530",
//         "spot_id": 5,
//         "place_id": 7,
//         "order": 3,
//         "description": "First Day End"
//       },
//       {
//         "date": "Tue Feb 20 2024 16:47:41 GMT+0530",
//         "spot_id": 6,
//         "place_id": 7,
//         "order": 4,
//         "description": "Second Day Start in Kodai"
//       },
//       {
//         "date": "Tue Feb 20 2024 16:47:41 GMT+0530",
//         "spot_id": 7,
//         "place_id": 14,
//         "order": 5,
//         "description": "Then Go to Kolli in the Second Day"
//       }
//     ]
// }

// {
//     "id": 6,
//     "trip_name": "Trip Name",
//     "members": "Testing",
//     "amout_spend": 9000,
//     "description": "Testing Description",
//     "new_places_visited": [
//       {
//         "place_id": 0,
//         "count": 0
//       }
//     ],
//     "old_places_visited": [
//       {
//         "place_id": 0,
//         "count": 0
//       }
//     ],
//     "data": [
//         {
//           "id": 16,
//           "date": "Mon Feb 19 2024 16:47:41 GMT+0530",
//           "spot_id": 2,
//           "place_id": 6,
//           "order": 1,
//           "description": "First Day Starts in Ooty Testing"
//         },
//         {
//           "id": 17,
//           "date": "Mon Feb 19 2024 16:47:41 GMT+0530",
//           "spot_id": 1,
//           "place_id": 7,
//           "order": 2,
//           "description": "Then Go to Kodai in the First Day Testing"
//         },
//         {
//           "id": 18,
//           "date": "Mon Feb 19 2024 16:47:41 GMT+0530",
//           "spot_id": 5,
//           "place_id": 7,
//           "order": 3,
//           "description": "First Day End Testing"
//         },
//         {
//           "id": 19,
//           "date": "Tue Feb 20 2024 16:47:41 GMT+0530",
//           "spot_id": 6,
//           "place_id": 7,
//           "order": 4,
//           "description": "Second Day Start in Kodai Testing"
//         },
//         {
//           "id": 20,
//           "date": "Tue Feb 20 2024 16:47:41 GMT+0530",
//           "spot_id": 7,
//           "place_id": 14,
//           "order": 5,
//           "description": "Then Go to Kolli in the Second Day Testing"
//         }
//       ]
//   }