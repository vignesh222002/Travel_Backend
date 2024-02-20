export const createTripSchema = {
    tags: ['Trip'],
    body: {
        type: 'object',
        properties: {
            trip_name: { type: 'string' },
            members: { type: 'string' },
            amout_spend: { type: 'number' },
            description: { type: 'string' },
            places_visited: {
                type: 'array',
                items: { type: 'number' }
            },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        date: { type: 'string' },
                        spot_id: { type: 'number' },
                        place_id: { type: 'number' },
                        order: { type: 'number' },
                        description: { type: 'string' }
                    },
                    required: ['date', 'spot_id', 'place_id', 'order', 'description']
                }
            },
        },
        required: ['trip_name', 'members', 'amout_spend', 'description', 'places_visited', 'data']
    }
}

export const getAllTripsSchema = {
    tags: ['Trip'],
}

export const getTripByIdSchema = {
    tags: ['Trip'],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        },
        required: ['id']
    }
}

export const deleteTripSchema = {
    tags: ['Trip'],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        },
        required: ['id']
    },
    body: {
        type: 'object',
        properties: {
            places_visited: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        place_id: { type: 'number' },
                        count: { type: 'number' }
                    },
                    required: ['place_id', 'count']
                }
            }
        },
        required: ['places_visited']
    }
}