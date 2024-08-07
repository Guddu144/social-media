import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'My Social Media API',
        description: 'Implementation of Swagger with TypeScript'
    },
    servers: [
        {
            url: `http://localhost:3000/api`,
            description: 'Local Server'
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};

const outputFile = '../swagger_output.json';
const endpointsFiles = ['./src/apis/route.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);


