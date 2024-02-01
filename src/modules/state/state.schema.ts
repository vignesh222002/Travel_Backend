// Interface

export interface IUpdateState {
    id: number,
    state: string
}

// Schema

export const createStateSchema = {
    body: {
        properties: {
            state: { type: 'string' }
        },
        required: ['state']
    }
}

export const updateStateSchema = {
    body: {
        properties: {
            id: { type: 'number' },
            state: { type: 'string' },
        },
        required: ['id', 'state']
    }
}