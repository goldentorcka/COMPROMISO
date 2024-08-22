// @ts-nocheck
module.exports = {
  settings: {
    cors: {
      enabled: true,
      origin: ['http://localhost:1337', 'http://localhost:1337/api/procesos', 'http://localhost:1337/api/procedimientos', 'http://localhost:1337/api/responsables', 'http://localhost:1337/api/areas', 'http://localhost:1337/api/unidades'], // Permite múltiples orígenes
    },
    // Agrega otros middlewares aquí según sea necesario
  },
};
