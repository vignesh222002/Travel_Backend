// Interface

export interface IUpdateState {
    id: number,
    state: string
}

// Schema

export const createStateSchema = {
    tags: ['State'],
    body: {
        type: 'object',
        properties: {
            state: { type: 'string' }
        },
        required: ['state']
    }
}

export const updateStateSchema = {
    tags: ['State'],
    body: {
        type: 'object',
        properties: {
            id: { type: 'number' },
            state: { type: 'string' },
        },
        required: ['id', 'state']
    }
}