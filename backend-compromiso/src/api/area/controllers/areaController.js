// @ts-nocheck
const Area = require('../models/areaModel.js');  // Ruta tal como la diste
const logger = require('../../../../config/logger.js');  // Ruta tal como la diste

const getAreas = async (req, res) => {
  try {
    const areas = await Area.findAll();
    if (areas.length === 0) {
      res.status(404).json({ message: 'No se encontraron áreas' });
    } else {
      res.json(areas);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getAreaById = async (req, res) => {
  try {
    const area = await Area.findByPk(req.params.id);
    if (area) {
      res.json(area);
    } else {
      res.status(404).json({ message: 'Área no encontrada' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createArea = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Datos insuficientes para crear el área' });
    }
    const area = await Area.create(req.body);
    res.status(201).json(area);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateArea = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Datos insuficientes para actualizar el área' });
    }
    const [updated] = await Area.update(req.body, {
      where: { Id_Area: req.params.id },
    });
    if (updated) {
      const updatedArea = await Area.findByPk(req.params.id);
      res.json(updatedArea);
    } else {
      res.status(404).json({ message: 'Área no encontrada' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteArea = async (req, res) => {
  try {
    const deleted = await Area.destroy({
      where: { Id_Area: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Área no encontrada' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
};
