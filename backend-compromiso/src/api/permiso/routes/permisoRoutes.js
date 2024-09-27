// src/api/permisos/routes/permisoRoutes.js
const express = require('express');
const { getPermisos, createPermiso } = require('../controllers/permisoController');
const router = express.Router();

router.get('/', getPermisos);
router.post('/', createPermiso);

// Puedes agregar más rutas para actualizar y eliminar permisos aquí.

module.exports = router;
