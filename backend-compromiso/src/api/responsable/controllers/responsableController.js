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
    const responsable = await Responsable.create(req.body);
    res.status(201).json(responsable);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateResponsable = async (req, res) => {
  try {
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
