// @ts-nocheck
const Responsable = require('../models/responsibleModel.js');
const { logger } = require('../../../../config/logger.js'); // Ruta del logger

// Validar campos obligatorios
const validateResponsable = (responsable) => {
  const { Nom_Responsable, estado } = responsable;
  let errors = [];

  if (!Nom_Responsable) errors.push("El campo 'Nom_Responsable' es obligatorio.");
  if (!estado) errors.push("El campo 'estado' es obligatorio.");

  return errors;
};

// Obtener todos los responsables
const getResponsables = async (req, res) => {
  try {
    const responsables = await Responsable.findAll();
    res.status(responsables.length === 0 ? 404 : 200).json(responsables.length === 0 ? { message: 'No se encontraron responsables' } : responsables);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un responsable por ID
const getResponsableById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const responsable = await Responsable.findByPk(id);
    if (!responsable) return res.status(404).json({ message: 'Responsable no encontrado' });
    res.json(responsable);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo responsable
const createResponsable = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No se proporcionaron datos' });
    }
    
    const errors = validateResponsable(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Errores de validación', errors });
    }

    const responsable = await Responsable.create(req.body);
    res.status(201).json(responsable);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un responsable existente
const updateResponsable = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
    }

    const errors = validateResponsable(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Errores de validación', errors });
    }

    const responsable = await Responsable.findByPk(id);
    if (!responsable) {
      return res.status(404).json({ message: 'Responsable no encontrado' });
    }

    await responsable.update(req.body);
    res.json(responsable);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un responsable por ID
const deleteResponsable = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const responsable = await Responsable.findByPk(id);
    if (!responsable) {
      return res.status(404).json({ message: 'Responsable no encontrado' });
    }

    await responsable.destroy();
    res.status(204).end();
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar las funciones
module.exports = {
  getResponsables,
  getResponsableById,
  createResponsable,
  updateResponsable,
  deleteResponsable
};
