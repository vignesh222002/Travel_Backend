// Schema

export const getPlaceByIdSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        },
        required: ['id']
    }
}

export const createPlaceSchema = {
    body: {
        properties: {
            place: { type: 'string' },
            state_id: { type: 'number' },
            landscape: { type: 'string' },
            is_visited: { type: 'boolean' },
            is_oneday_trip: { type: 'boolean' },
            stay_option: { type: 'string' },
            best_time_to_visit: { type: 'string' },
            nearest_place: { type: 'string' },
        },
        required: ['place', 'state_id', 'landscape', 'is_visited', 'is_oneday_trip', 'nearest_place']
    }
}

export const UpdatePlaceSchema = {
    body: {
        properties: {
            id: { type: 'number' },
            place: { type: 'string' },
            state_id: { type: 'number' },
            landscape: { type: 'string' },
            is_visited: { type: 'boolean' },
            is_oneday_trip: { type: 'boolean' },
            stay_option: { type: 'string' },
            best_time_to_visit: { type: 'string' },
            nearest_place: { type: 'string' }
        },
        required: ['id', 'place', 'state_id', 'landscape', 'is_visited', 'is_oneday_trip', 'nearest_place']
    }
}