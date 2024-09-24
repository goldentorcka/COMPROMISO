// @ts-nocheck
const Formato = require('../models/formatoModel.js');
const logger = require('../../../../config/logger.js');

const getFormatos = async (req, res) => {
  try {
    const formatos = await Formato.findAll();
    if (formatos.length === 0) {
      res.status(404).json({ message: 'No se encontraron formatos' });
    } else {
      res.json(formatos);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getFormatoById = async (req, res) => {
  try {
    const formato = await Formato.findByPk(req.params.id);
    if (formato) {
      res.json(formato);
    } else {
      res.status(404).json({ message: 'Formato no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createFormato = async (req, res) => {
  try {
    const { Cod_Formato, Fec_Actualizacion, Ver_Formato, Est_Formato, Id_Responsable, Nom_Formato, Nom_Magnetico, Id_Procedimiento, Id_Unidad } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!Cod_Formato || !Fec_Actualizacion || !Ver_Formato || !Est_Formato || !Nom_Formato || !Nom_Magnetico || !Id_Procedimiento || !Id_Unidad) {
      return res.status(400).json({ error: 'Datos requeridos faltantes o inválidos' });
    }

    // Validar que el estado sea 'Activo' o 'Inactivo'
    if (Est_Formato !== 'Activo' && Est_Formato !== 'Inactivo') {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    // Crear el formato si todas las validaciones son correctas
    const formato = await Formato.create({
      Cod_Formato,
      Fec_Actualizacion,
      Ver_Formato,
      Est_Formato,
      Id_Responsable,
      Nom_Formato,
      Nom_Magnetico,
      Id_Procedimiento,
      Id_Unidad
    });

    res.status(201).json(formato);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });

    // Manejo de errores con un mensaje genérico
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Error en el procesamiento de datos' });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateFormato = async (req, res) => {
  try {
    const [updated] = await Formato.update(req.body, {
      where: { Id_Formato: req.params.id },
    });

    if (updated) {
      const updatedFormato = await Formato.findByPk(req.params.id);
      res.json(updatedFormato);
    } else {
      res.status(404).json({ message: 'Formato no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteFormato = async (req, res) => {
  try {
    const deleted = await Formato.destroy({
      where: { Id_Formato: req.params.id },
    });

    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Formato no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getFormatos,
  getFormatoById,
  createFormato,
  updateFormato,
  deleteFormato,
};
