// @ts-nocheck
// src/api/permisos/controllers/permisoController.js
const Permiso = require('../models/permisoModel');

exports.getPermisos = async (req, res) => {
  try {
    const permisos = await Permiso.findAll();
    res.json(permisos);
  } catch (error) {
    console.error("Error al obtener permisos:", error);
    res.status(500).json({ error: 'Error al obtener permisos' });
  }
};

exports.createPermiso = async (req, res) => {
  const { nombre } = req.body;
  try {
    const nuevoPermiso = await Permiso.create({ nombre });
    res.status(201).json(nuevoPermiso);
  } catch (error) {
    console.error("Error al crear permiso:", error);
    res.status(500).json({ error: 'Error al crear permiso' });
  }
};

// Puedes agregar más funciones para actualizar y eliminar permisos aquí.
