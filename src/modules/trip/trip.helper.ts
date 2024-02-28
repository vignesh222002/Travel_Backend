import { AllTripApiData, getAllTripsResponse, getTripByIdResponse, getTripByIdResponseFormatter, getTripByIdResponseRawData, places_visited } from "./trip.interfaces";

const data = [
    {
        "id": 3,
        "description": "Default description for Trips",
        "amount_spend": 1000,
        "members": "Me",
        "trip_name": "Trip Name",
        "dates": [
            "01/01/2024"
        ],
        "places": [
            "Ooty"
        ],
        "place_image_link": "https://tamilnadutourisminfo.com/wp-content/uploads/2019/03/ooty_tamilnadu.jpg"
    },
    {
        "id": 6,
        "description": "Testing Description",
        "amount_spend": 9000,
        "members": "Me,Testing,Balu",
        "trip_name": "Trip Name",
        "dates": [
            "19/02/2024",
            "20/02/2024"
        ],
        "places": [
            "Ooty",
            "KodaiKanal",
            "Kolli Hills"
        ],
        "place_image_link": "https://tamilnadutourisminfo.com/wp-content/uploads/2019/03/ooty_tamilnadu.jpg"
    }
]

export const getAllTripsResponseFormatter = async (data: getAllTripsResponse[]) => {
    let result: AllTripApiData = {
        total_trips: 0,
        total_places_visited: 0,
        places_visited: [],
        total_amount_spent: 0,
        total_days_spent: 0,
        total_oneday_trips: 0,
        total_multiday_trips: 0,
        trip_data: [],
    }

    // Trip Data
    await data?.map((item: getAllTripsResponse) => {
        // Add All Dates
        let dates = item.Trip_days_ref.reduce((dates: string[], item) => {
            const date = item.date;
            if (!dates.includes(date)) dates.push(date)
            return dates;
        }, [])

        // Add All Places
        let places = item.Trip_days_ref.reduce((places: string[], item) => {
            const place = item.place_ref.place;
            if (!places.includes(place)) places.push(place)
            return places;
        }, [])

        // Places Visited In theTrip
        let places_visited_by_trip: places_visited[] = []
        item.Trip_days_ref.map((item) => {
            if (!places_visited_by_trip.find(place => place.place_id === item.place_ref.id)) {
                places_visited_by_trip.push({
                    place_id: item.place_ref.id,
                    count: item.place_ref.count,
                })
            }
        })

        // Add Place Image Link too and the Logic for return Priority Place Image


        result.trip_data.push({
            id: item.id,
            description: item.description,
            amount_spend: item.amount_spend,
            members: item.members,
            trip_name: item.trip_name,
            dates,
            places,
            place_image_link: item.Trip_days_ref[0].place_ref.image_link,
            places_visited: places_visited_by_trip,
        })
    })

    // Places Visited
    await result?.trip_data?.map(item => {
        item?.places?.map(place => {
            if (!result.places_visited.find(find_place => place === find_place)) {
                result.places_visited.push(place)
            }
        })
    })

    // Total Amount Spent
    result.total_amount_spent = await result.trip_data.reduce((total, value) => total + value.amount_spend, 0);

    // Total Days Spent, Total Multi Days Spent, Total One Day Spent
    await result.trip_data.map(async (item) => {
        if (item.dates.length) {
            result.total_days_spent = await item.dates.length + result.total_days_spent
            if (item.dates.length === 1) result.total_oneday_trips++
            else result.total_multiday_trips++
        }
    })

    // Total Places Visited
    result.total_places_visited = result.places_visited.length

    // Total Trips
    result.total_trips = result.trip_data.length

    return result;
}


export const getTripsByIdResponseFormatter = async (data: getTripByIdResponse) => {
    let result: getTripByIdResponseFormatter = {
        id: data.id,
        description: data.description,
        amount_spend: data.amount_spend,
        members: data.members,
        trip_name: data.trip_name,
        places_visited: [],
        trip_data: {},
    }

    data.Trip_days_ref.map(item => {
        // Add Place details covered in that Paricular Trip
        if (!result.places_visited.find(data => data.place_id == item.place_ref.id)) {
            result.places_visited.push({ place_id: item.place_ref.id, count: item.place_ref.count, place: item.place_ref.place })
        }

        if (!result.trip_data[item.date]) {
            result.trip_data[item.date] = {}
        }

        if (!result.trip_data[item.date][item.place_ref.place]) {
            result.trip_data[item.date][item.place_ref.place] = []
        }

        result.trip_data[item.date][item.place_ref.place].push({
            date: item.date,
            order: item.order,
            description: item.description,
            place: item.place_ref.place,
            spot: item.spots_ref
        })

    })

    return result
}

export const getTripByIdRawData = async (data: getTripByIdResponse) => {
    let result: getTripByIdResponseRawData = {
        id: data.id,
        description: data.description,
        amount_spend: data.amount_spend,
        members: data.members,
        trip_name: data.trip_name,
        old_places: [],
        data: [],
    }

    data.Trip_days_ref.map(item => {
        // Add Place details covered in that Paricular Trip
        if (!result.old_places.find(data => data.place_id == item.place_ref.id)) {
            result.old_places.push({ place_id: item.place_ref.id, count: item.place_ref.count })
        }

        result.data.push({
            id: item.id,
            date: item.date,
            description: item.description,
            order: item.order,
            place_id: item.place_ref.id,
            spot_id: item.spots_ref.id
        })
    })

    return result
}


export const compare_places = (oldArray: places_visited[], newArray: places_visited[]) => {
    let added: places_visited[] = [];
    let deleted: places_visited[] = [];

    oldArray.map(item => {
        if (!newArray.find(data => item.place_id == data.place_id)) {
            deleted.push(item)
        }
    })

    newArray.map(item => {
        if (!oldArray.find(data => item.place_id == data.place_id)) {
            added.push(item)
        }
    })

    return {
        deleted,
        added
    }
}