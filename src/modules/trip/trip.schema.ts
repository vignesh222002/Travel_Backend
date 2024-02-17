export const createTripSchema = {
    tags: ['Trip'],
    body: {
        type: 'object',
        properties: {
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
            }
        },
        required: ['data']
    }
}

export const getAllTripsSchema = {
    tags: ['Trip'],
}