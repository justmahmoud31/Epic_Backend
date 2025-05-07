// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Auth API',
      version: '1.0.0',
      description: 'API documentation for user signup and login',
    },
    servers: [
      {
        url: 'https://api.ipek-eg.com',
        description: 'Local dev server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/Modules/**/*.js'], // ✅ scan all module .js files
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
