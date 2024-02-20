import { getAllTripsResponse, getTripByIdResponse, getTripByIdResponseFormatter } from "./trip.interfaces";

export const getAllTripsResponseFormatter = async (data: getAllTripsResponse[]) => {
    let result: any = []

    data?.map(item => {
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


        // Add Place Image Link too and the Logic for return Priority Place Image

        result.push({
            id: item.id,
            description: item.description,
            dates,
            places,
            place_image_link: item.Trip_days_ref[0].place_ref.image_link
        })
    })

    return result;
}


export const getTripsByIdResponseFormatter = async (data: getTripByIdResponse) => {
    let result: getTripByIdResponseFormatter = {
        id: data.id,
        description: data.description,
        places_visited: [],
        trip_data: {},
    }

    data.Trip_days_ref.map(item => {
        // Add Place details covered in that Paricular Trip
        if (!result.places_visited.find(data => data.place_id == item.place_ref.id)) {
            result.places_visited.push({ place_id: item.place_ref.id, count: item.place_ref.count })
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