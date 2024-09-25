// @ts-nocheck
const Documento = require('../models/documentoModel.js');
const logger = require('../../../../config/logger.js');

const getDocumentos = async (req, res) => {
  try {
    const documentos = await Documento.findAll();
    if (documentos.length === 0) {
      res.status(404).json({ message: 'No se encontraron documentos' });
    } else {
      res.json(documentos);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getDocumentoById = async (req, res) => {
  try {
    const documento = await Documento.findByPk(req.params.id);
    if (documento) {
      res.json(documento);
    } else {
      res.status(404).json({ message: 'Documento no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createDocumento = async (req, res) => {
  try {
    const {
      Cod_Documento,
      Fec_Elaboracion_Documento,
      Ver_Documento,
      estado,
      Id_Responsable,
      Nom_Documento,
      Nom_Documento_Magnetico,
      Id_Procedimiento,
    } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (
      !Cod_Documento ||
      !Fec_Elaboracion_Documento ||
      !Ver_Documento ||
      !estado ||
      !Nom_Documento ||
      !Nom_Documento_Magnetico ||
      !Id_Procedimiento
    ) {
      return res.status(400).json({ error: 'Datos requeridos faltantes o inválidos' });
    }

    // Validar que el estado sea 'Activo' o 'Inactivo'
    if (estado !== 'Activo' && estado !== 'Inactivo') {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    // Crear el documento si todas las validaciones son correctas
    const documento = await Documento.create({
      Cod_Documento,
      Fec_Elaboracion_Documento,
      Ver_Documento,
      estado,
      Id_Responsable,
      Nom_Documento,
      Nom_Documento_Magnetico,
      Id_Procedimiento,
    });

    res.status(201).json(documento);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });

    // Manejo de errores con un mensaje genérico
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Error en el procesamiento de datos' });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateDocumento = async (req, res) => {
  try {
    const {
      Cod_Documento,
      Fec_Elaboracion_Documento,
      Ver_Documento,
      estado,
      Id_Responsable,
      Nom_Documento,
      Nom_Documento_Magnetico,
      Id_Procedimiento,
    } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (
      !Cod_Documento ||
      !Fec_Elaboracion_Documento ||
      !Ver_Documento ||
      !estado ||
      !Nom_Documento ||
      !Nom_Documento_Magnetico ||
      !Id_Procedimiento
    ) {
      return res.status(400).json({ error: 'Datos requeridos faltantes o inválidos' });
    }

    // Validar que el estado sea 'Activo' o 'Inactivo'
    if (estado !== 'Activo' && estado !== 'Inactivo') {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    const [updated] = await Documento.update(req.body, {
      where: { Id_Documento: req.params.id },
    });

    if (updated) {
      const updatedDocumento = await Documento.findByPk(req.params.id);
      res.json(updatedDocumento);
    } else {
      res.status(404).json({ message: 'Documento no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteDocumento = async (req, res) => {
  try {
    const deleted = await Documento.destroy({
      where: { Id_Documento: req.params.id },
    });

    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Documento no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getDocumentos,
  getDocumentoById,
  createDocumento,
  updateDocumento,
  deleteDocumento,
};
