// @ts-nocheck
const Responsable = require('../models/responsibleModel.js'); // Ruta ajustada
const logger = require('../../../../config/logger.js'); // Ruta ajustada

const getResponsables = async (req, res) => {
  try {
    const responsables = await Responsable.findAll();
    if (responsables.length === 0) {
      res.status(404).json({ message: 'No se encontraron responsables' });
    } else {
      res.json(responsables);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getResponsableById = async (req, res) => {
  try {
    const responsable = await Responsable.findByPk(req.params.id);
    if (!responsable) {
      res.status(404).json({ message: 'Responsable no encontrado' });
    } else {
      res.json(responsable);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createResponsable = async (req, res) => {
  try {
    const { Nom_Responsable, estado } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!Nom_Responsable || !estado) {
      return res.status(400).json({ error: 'Datos requeridos faltantes o inválidos' });
    }

    // Validar longitud del nombre (por ejemplo, al menos 3 caracteres)
    if (Nom_Responsable.length < 3) {
      return res.status(400).json({ error: 'Datos requeridos faltantes o inválidos' });
    }

    // Validar que el estado sea 'Sí' o 'No'
    if (estado !== 'Sí' && estado !== 'No') {
      return res.status(400).json({ error: 'Datos requeridos faltantes o inválidos' });
    }

    // Crear el responsable si todas las validaciones son correctas
    const responsable = await Responsable.create({ Nom_Responsable, estado });
    return res.status(201).json(responsable);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    
    // Manejo de errores con un mensaje genérico
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Error en el procesamiento de datos' });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateResponsable = async (req, res) => {
  try {
    const responsable = await Responsable.findByPk(req.params.id);

    if (!responsable) {
      return res.status(404).json({ message: 'Responsable no encontrado' });
    }

    const [updated] = await Responsable.update(req.body, {
      where: { Id_Responsable: req.params.id },
    });

    if (updated) {
      const updatedResponsable = await Responsable.findByPk(req.params.id);
      res.json(updatedResponsable);
    } else {
      res.status(404).json({ message: 'Responsable no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteResponsable = async (req, res) => {
  try {
    const responsable = await Responsable.findByPk(req.params.id);

    if (!responsable) {
      return res.status(404).json({ message: 'Responsable no encontrado' });
    }

    const deleted = await Responsable.destroy({
      where: { Id_Responsable: req.params.id },
    });

    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Responsable no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getResponsables,
  getResponsableById,
  createResponsable,
  updateResponsable,
  deleteResponsable,
};
