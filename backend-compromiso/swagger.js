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
  apis: ['./index.js'], // Ruta correcta según la ubicación del archivo index.js
};

let specs;
try {
  specs = swaggerJsdoc(options);
} catch (error) {
  console.error('Error al generar la documentación de Swagger:', error);
  process.exit(1);
}

const swaggerDocs = swaggerUi.serve;
const swaggerSetup = swaggerUi.setup(specs);

module.exports = { swaggerDocs, swaggerSetup };
