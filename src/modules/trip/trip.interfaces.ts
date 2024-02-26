export interface getAllTripsResponse {
    id: number;
    description: string;
    amount_spend: number;
    members: string;
    trip_name: string;
    Trip_days_ref: {
        date: string;
        id: number;
        order: number;
        place_ref: {
            id: number;
            place: string;
            image_link: string;
        };
    }[]
}

export interface getTripByIdResponse {
    id: number;
    description: string;
    amount_spend: number;
    members: string;
    trip_name: string;
    Trip_days_ref: {
        id: number;
        date: string;
        order: number;
        description: string;
        place_ref: {
            id: number;
            place: string;
            count: number;
        };
        spots_ref: {
            id: number;
            spot: string;
            category: string;
            image_link: string;
            google_location: string;
            must_visit: boolean;
        };
    }[];
}

export interface getTripByIdResponseRawData {
    id: number;
    description: string;
    amount_spend: number;
    members: string;
    trip_name: string;
    old_places: places_visited[];
    data: {
        id: number,
        date: string,
        order: number,
        description: string,
        place_id: number,
        spot_id: number,
    }[]
}

export interface getTripByIdResponseFormatter {
    id: number;
    description: string;
    amount_spend: number;
    members: string;
    trip_name: string;
    places_visited: {
        place: string;
        place_id: number;
        count: number;
    }[];
    trip_data: {
        [key: string]: {
            [key: string]: {
                date: string;
                order: number;
                description: string;
                place: string;
                spot: {
                    id: number;
                    spot: string;
                    category: string;
                    image_link: string;
                    google_location: string;
                    must_visit: boolean;
                };
            }[];
        }
    }
}

export interface places_visited {
    place_id: number,
    count: number
}

export interface AllTripApiData {
    trip_data: AllTripData[];
    total_trips: number;
    total_amount_spent: number;
    total_days_spent: number;
    total_places_visited: number;
    places_visited: string[];
    total_oneday_trips: number;
    total_multiday_trips: number;
}

export interface AllTripData {
    id: number,
    description: string,
    amount_spend: number;
    members: string;
    trip_name: string;
    dates: string[],
    places: string[],
    place_image_link: string
}