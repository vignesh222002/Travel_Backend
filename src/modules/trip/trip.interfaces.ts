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