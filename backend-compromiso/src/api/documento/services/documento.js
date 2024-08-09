'use strict';

/**
 * documento service
 */

const Documento = require('../models/documentModel.js'); // Importar el modelo Sequelize
const logger = require('../../../utils/logger'); // Importar el logger

module.exports = {
  async create(data) {
    try {
      const { tipo_documento, codigo, version, nombre_documento, status } = data;

      // Validación de los campos necesarios
      if (!tipo_documento || !codigo || !version || !nombre_documento) {
        throw new Error('Faltan campos obligatorios');
      }

      const documento = await Documento.create({
        tipo_documento,
        codigo,
        version,
        nombre_documento,
        status: status || 'Activo', // Valor por defecto
      });

      return documento;
    } catch (error) {
      logger.error(`Error creando documento: ${error.message}`);
      throw new Error('Error creando documento');
    }
  },

  async findAll() {
    try {
      const documentos = await Documento.findAll();
      return documentos;
    } catch (error) {
      logger.error(`Error obteniendo documentos: ${error.message}`);
      throw new Error('Error obteniendo documentos');
    }
  },

  async findById(id) {
    try {
      const documento = await Documento.findByPk(id);
      if (!documento) throw new Error('Documento no encontrado');
      return documento;
    } catch (error) {
      logger.error(`Error obteniendo documento por ID: ${error.message}`);
      throw new Error('Error obteniendo documento por ID');
    }
  },

  async update(id, data) {
    try {
      const [updated] = await Documento.update(data, { where: { id } });
      if (!updated) throw new Error('Documento no encontrado');
      const updatedDocumento = await Documento.findByPk(id);
      return updatedDocumento;
    } catch (error) {
      logger.error(`Error actualizando documento: ${error.message}`);
      throw new Error('Error actualizando documento');
    }
  },

  async delete(id) {
    try {
      const deleted = await Documento.destroy({ where: { id } });
      if (!deleted) throw new Error('Documento no encontrado');
      return { message: 'Documento eliminado con éxito' };
    } catch (error) {
      logger.error(`Error eliminando documento: ${error.message}`);
      throw new Error('Error eliminando documento');
    }
  },
};
