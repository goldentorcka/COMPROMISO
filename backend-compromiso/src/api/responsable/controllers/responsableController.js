// @ts-nocheck
const Responsable = require('../models/responsibleModel.js');
const logger = require('../../../../config/logger.js');

const getResponsables = async (req, res) => {
  try {
    const responsables = await Responsable.findAll();
    if (responsables.length === 0) {
      res.status(404).json({ message: 'No se encontraron responsables' });
    } else {
      res.json(responsables);
    }
  } catch (error) {
    logger.error(`Error al obtener responsables: ${error}`);
    res.status(500).json({ message: 'Error al obtener responsables' });
  }
};

const getResponsableById = async (req, res) => {
  try {
    const id = req.params.id;
    const responsable = await Responsable.findByPk(id);
    if (!responsable) {
      res.status(404).json({ message: `No se encontró el responsable con id ${id}` });
    } else {
      res.json(responsable);
    }
  } catch (error) {
    logger.error(`Error al obtener responsable con id ${req.params.id}: ${error}`);
    res.status(500).json({ message: 'Error al obtener responsable' });
  }
};

const createResponsable = async (req, res) => {
  try {
    const responsable = await Responsable.create(req.body);
    res.json(responsable);
  } catch (error) {
    logger.error(`Error al crear responsable: ${error}`);
    res.status(500).json({ message: 'Error al crear responsable' });
  }
};

const updateResponsable = async (req, res) => {
  try {
    const id = req.params.id;
    const responsable = await Responsable.findByPk(id);
    if (!responsable) {
      res.status(404).json({ message: `No se encontró el responsable con id ${id}` });
    } else {
      await responsable.update(req.body);
      res.json(responsable);
    }
  } catch (error) {
    logger.error(`Error al actualizar responsable con id ${req.params.id}: ${error}`);
    res.status(500).json({ message: 'Error al actualizar responsable' });
  }
};

const deleteResponsable = async (req, res) => {
  try {
    const id = req.params.id;
    const responsable = await Responsable.findByPk(id);
    if (!responsable) {
      res.status(404).json({ message: `No se encontró el responsable con id ${id}` });
    } else {
      await responsable.destroy();
      res.json({ message: `Responsable con id ${id} eliminado` });
    }
  } catch (error) {
    logger.error(`Error al eliminar responsable con id ${req.params.id}: ${error}`);
    res.status(500).json({ message: 'Error al eliminar responsable' });
  }
};

module.exports = {
  getResponsables,
  getResponsableById,
  createResponsable,
  updateResponsable,
  deleteResponsable
};