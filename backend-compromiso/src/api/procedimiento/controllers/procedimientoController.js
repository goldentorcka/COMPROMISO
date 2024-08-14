const Procedimiento = require('../models/procedimientoModel.js');
const logger = require('../../../../config/logger.js');

const getProcedimientos = async (req, res) => {
  try {
    const procedimientos = await Procedimiento.findAll();
    if (procedimientos.length === 0) {
      res.status(404).json({ message: 'No se encontraron procedimientos' });
    } else {
      res.json(procedimientos);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const getProcedimientoById = async (req, res) => {
  try {
    const procedimiento = await Procedimiento.findByPk(req.params.id);
    if (procedimiento) {
      res.json(procedimiento);
    } else {
      res.status(404).json({ message: 'Procedimiento no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createProcedimiento = async (req, res) => {
  try {
    const procedimiento = await Procedimiento.create(req.body);
    res.status(201).json(procedimiento);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateProcedimiento = async (req, res) => {
  try {
    const [updated] = await Procedimiento.update(req.body, {
      where: { Id_Procedimiento: req.params.id },
    });
    if (updated) {
      const updatedProcedimiento = await Procedimiento.findByPk(req.params.id);
      res.json(updatedProcedimiento);
    } else {
      res.status(404).json({ message: 'Procedimiento no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteProcedimiento = async (req, res) => {
  try {
    const deleted = await Procedimiento.destroy({
      where: { Id_Procedimiento: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Procedimiento no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getProcedimientos,
  getProcedimientoById,
  createProcedimiento,
  updateProcedimiento,
  deleteProcedimiento,
};
