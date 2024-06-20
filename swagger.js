import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Summarization API',
      version: '1.0.0',
      description: 'Express api liable for provide text summarization.',
    },
  },
  apis: ['./route.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default (app) => {
  app.use('/api-docs', serve, setup(swaggerSpec));
};