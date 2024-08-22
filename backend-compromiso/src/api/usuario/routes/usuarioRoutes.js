// @ts-nocheck
const express = require('express');
const {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario
} = require('../controllers/usuarioController.js');
const logger = require('../../../../config/logger.js');
const checkAuth = require('../../../../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/login', loginUsuario);

router.get('/', checkAuth, getUsuarios);
router.get('/:id', checkAuth, getUsuarioById);
router.post('/', checkAuth, createUsuario);
router.put('/:id', checkAuth, updateUsuario);
router.delete('/:id', checkAuth, deleteUsuario);

module.exports = router;
