export const createTripSchema = {
    tags: ['Trip'],
    body: {
        type: 'object',
        properties: {
            trip_name: { type: 'string' },
            members: { type: 'string' },
            amount_spend: { type: 'number' },
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
        required: ['trip_name', 'members', 'amount_spend', 'description', 'places_visited', 'data']
    }
}

export const editTripSchema = {
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
            id: { type: 'number' },
            trip_name: { type: 'string' },
            members: { type: 'string' },
            amount_spend: { type: 'number' },
            description: { type: 'string' },
            new_places_visited: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        place_id: { type: 'number' },
                        count: { type: 'number' }
                    },
                    required: ['place_id', 'count']
                }
            },
            old_places_visited: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        place_id: { type: 'number' },
                        count: { type: 'number' }
                    },
                    required: ['place_id', 'count']
                }
            },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        date: { type: 'string' },
                        spot_id: { type: 'number' },
                        place_id: { type: 'number' },
                        order: { type: 'number' },
                        description: { type: 'string' }
                    },
                    required: ['id', 'date', 'spot_id', 'place_id', 'order', 'description']
                }
            },
        },
        required: ['id', 'trip_name', 'members', 'amount_spend', 'description', 'new_places_visited', 'old_places_visited', 'data']
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
    },
    querystring: {
        type: 'object',
        properties: {
            raw_data: { type: 'boolean' }
        },
        required: []
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