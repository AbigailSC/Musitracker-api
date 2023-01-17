export const swaggerDefinition = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Musitracker API',
      version: '1.0.0',
      description:
        'An API for user registration and search for songs, albums, artists based on the Deezer API'
    },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./src/docs/*.yaml']
};
