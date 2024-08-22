// swagger.js
// @ts-nocheck
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
  apis: ['./src/api/**/*.js'], // Ajusta esta ruta según la ubicación real de tus archivos de rutas
};

const specs = swaggerJsdoc(options);

const swaggerSetup = swaggerUi.setup(specs);
const swaggerDocs = swaggerUi.serve;

module.exports = { swaggerDocs, swaggerSetup };
