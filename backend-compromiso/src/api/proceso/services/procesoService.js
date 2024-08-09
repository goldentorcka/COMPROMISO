'use strict';

const Proceso = require('../models/procesoModel.js');
const logger = require('../../../utils/logger');

module.exports = {
  async create(data) {
    try {
      const { nombre_proceso } = data;

      if (!nombre_proceso) {
        throw new Error('Falta el campo obligatorio: nombre_proceso');
      }

      const proceso = await Proceso.create({ nombre_proceso });
      return proceso;
    } catch (error) {
      logger.error(`Error creando proceso: ${error.message}`);
      throw new Error('Error creando proceso');
    }
  },

  async findAll() {
    try {
      const procesos = await Proceso.findAll();
      return procesos;
    } catch (error) {
      logger.error(`Error obteniendo procesos: ${error.message}`);
      throw new Error('Error obteniendo procesos');
    }
  },

  async findById(id) {
    try {
      const proceso = await Proceso.findByPk(id);
      if (!proceso) throw new Error('Proceso no encontrado');
      return proceso;
    } catch (error) {
      logger.error(`Error obteniendo proceso por ID: ${error.message}`);
      throw new Error('Error obteniendo proceso por ID');
    }
  },

  async update(id, data) {
    try {
      const [updated] = await Proceso.update(data, { where: { id } });
      if (!updated) throw new Error('Proceso no encontrado');
      const updatedProceso = await Proceso.findByPk(id);
      return updatedProceso;
    } catch (error) {
      logger.error(`Error actualizando proceso: ${error.message}`);
      throw new Error('Error actualizando proceso');
    }
  },

  async delete(id) {
    try {
      const deleted = await Proceso.destroy({ where: { id } });
      if (!deleted) throw new Error('Proceso no encontrado');
      return { message: 'Proceso eliminado con éxito' };
    } catch (error) {
      logger.error(`Error eliminando proceso: ${error.message}`);
      throw new Error('Error eliminando proceso');
    }
  },
};
