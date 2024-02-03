export const addSpotSchema = {
    tags: ['Spot'],
    body: {
        properties: {
            place_id: { type: 'number' },
            spot: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
            timing: { type: 'string' },
            season: { type: 'string' },
            google_location: { type: 'string' },
            must_visit: { type: 'boolean' },
            image_link: { type: 'string' }
        },
        required: ['spot', 'category', 'timing', 'season', 'must_visit', 'place_id']
    }
}

export const updateSpotSchema = {
    tags: ['Spot'],
    body: {
        properties: {
            id: { type: 'number' },
            place_id: { type: 'number' },
            spot: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
            timing: { type: 'string' },
            season: { type: 'string' },
            google_location: { type: 'string' },
            must_visit: { type: 'boolean' },
            image_link: { type: 'string' }
        },
        required: ['id', 'spot', 'category', 'timing', 'season', 'must_visit', 'place_id']
    }
}

export const deleteSpotSchema = {
    tags: ['Spot'],
    params: {
        type: 'object',
        properties: {
            spot_id: { type: 'number' },
            place_id: { type: 'number' }
        },
        required: ['spot_id', 'place_id']
    }
}