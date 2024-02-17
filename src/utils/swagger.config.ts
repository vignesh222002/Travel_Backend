const swaggerConfig = {
    swagger: {
        info: {
            title: 'Travel',
            description: 'Travel Planner',
            version: '0.1.0',
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'State', description: 'State APIs' },
            { name: 'Place', description: 'Place APIs' },
            { name: 'Spot', description: 'Spot APIs' },
            { name: 'Trip', description: 'Trip APIs' },
        ],
    }
}

export default swaggerConfig;