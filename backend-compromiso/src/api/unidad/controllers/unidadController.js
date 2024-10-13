// @ts-nocheck
const Unidad = require('../models/unidadModel.js');
const logger = require('../../../../config/logger.js');

exports.getUnidades = async (req, res) => {
  try {
    const unidades = await Unidad.findAll();
    if (unidades.length === 0) {
      res.status(404).json({ message: 'No se encontraron unidades' });
    } else {
      res.json(unidades);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getUnidadById = async (req, res) => {
  try {
    const unidad = await Unidad.findByPk(req.params.id);
    if (!unidad) {
      res.status(404).json({ message: 'Unidad no encontrada' });
    } else {
      res.json(unidad);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.createUnidad = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Datos insuficientes para crear la unidad' });
    }
    const unidad = await Unidad.create(req.body);
    res.status(201).json(unidad);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateUnidad = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Datos insuficientes para actualizar la unidad' });
    }
    const [updated] = await Unidad.update(req.body, {
      where: { Id_Unidad: req.params.id },
    });
    if (updated) {
      const updatedUnidad = await Unidad.findByPk(req.params.id);
      res.json(updatedUnidad);
    } else {
      res.status(404).json({ message: 'Unidad no encontrada' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.deleteUnidad = async (req, res) => {
  try {
    const deleted = await Unidad.destroy({
      where: { Id_Unidad: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Unidad no encontrada' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
