// config/middlewares.js

module.exports = {
  settings: {
    cors: {
      enabled: true,
      origin: ['http://localhost:3000', 'http://localhost:1337/api/procesos'], // Permite múltiples orígenes
    },
    // Agrega otros middlewares aquí según sea necesario
  },
};
