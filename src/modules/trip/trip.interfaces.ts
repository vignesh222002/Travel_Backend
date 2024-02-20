export interface getAllTripsResponse {
    id: number;
    description: string;
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
    Trip_days_ref: {
        id: number;
        date: string;
        order: number;
        description: string;
        place_ref: {
            id: number;
            place: string;
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
