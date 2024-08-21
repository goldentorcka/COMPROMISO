// @ts-nocheck
// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API',
      version: '1.0.0',
      description: 'Documentación de la API usando Swagger',
    },
  },
  apis: ['./src/api/**/*.js'], // Ajusta la ruta a tus archivos de rutas
};

const specs = swaggerJsdoc(options);

const swaggerSetup = swaggerUi.serve;
const swaggerDocs = swaggerUi.setup(specs);

module.exports = { swaggerSetup, swaggerDocs };
