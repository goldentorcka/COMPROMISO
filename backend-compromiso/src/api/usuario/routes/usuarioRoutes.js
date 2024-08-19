const express = require('express');
const {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} = require('../controllers/usuarioController.js');
const logger = require('../../../../config/logger.js');
const checkAuth = require('../../../../middlewares/authMiddleware.js'); // Importa el middleware

const router = express.Router();

// Middleware para capturar errores
router.use((err, req, res, next) => {
  if (err) {
    logger.error(`Error: ${err.message}, Ruta: ${req.originalUrl}`);
    res.status(500).json({ error: 'Algo salió mal, intente de nuevo más tarde' });
  } else {
    next();
  }
});

// Aplica el middleware checkAuth solo a las rutas que necesitan autenticación
router.get('/', checkAuth, getUsuarios);
router.get('/:id', checkAuth, getUsuarioById);
router.post('/', checkAuth, createUsuario);
router.put('/:id', checkAuth, updateUsuario);
router.delete('/:id', checkAuth, deleteUsuario);

module.exports = router;
