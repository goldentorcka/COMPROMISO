'use strict';

// Importa el logger desde la ruta correcta
const logger = require('../../utils/logger');

module.exports = {
  // Acción para obtener todos los responsables
  async find(ctx) {
    try {
      const responsables = await strapi.db.query('api::responsable.responsable').findMany({
        where: ctx.query,
        populate: '*', // Poblar cualquier relación si es necesario
      });
      return responsables;
    } catch (err) {
      // Registra el error y lanza una excepción
      logger.error(`Error en find: ${err.message}`);
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Acción para obtener un responsable por ID
  async findOne(ctx) {
    const { id } = ctx.params;
    try {
      const responsable = await strapi.db.query('api::responsable.responsable').findOne({
        where: { id },
        populate: '*', // Poblar cualquier relación si es necesario
      });
      if (!responsable) {
        return ctx.notFound('Responsable no encontrado');
      }
      return responsable;
    } catch (err) {
      // Registra el error y lanza una excepción
      logger.error(`Error en findOne: ${err.message}`);
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Acción para crear un nuevo responsable
  async create(ctx) {
    try {
      const data = ctx.request.body; // Usa ctx.request.body directamente
      const nuevoResponsable = await strapi.db.query('api::responsable.responsable').create({
        data: data,
      });
      return nuevoResponsable;
    } catch (err) {
      // Registra el error y lanza una excepción
      logger.error(`Error en create: ${err.message}`);
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Acción para actualizar un responsable existente
  async update(ctx) {
    const { id } = ctx.params;
    try {
      const data = ctx.request.body; // Usa ctx.request.body directamente
      const responsableActualizado = await strapi.db.query('api::responsable.responsable').update({
        where: { id },
        data: data,
      });
      if (!responsableActualizado) {
        return ctx.notFound('Responsable no encontrado');
      }
      return responsableActualizado;
    } catch (err) {
      // Registra el error y lanza una excepción
      logger.error(`Error en update: ${err.message}`);
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Acción para eliminar un responsable
  async delete(ctx) {
    const { id } = ctx.params;
    try {
      const responsableEliminado = await strapi.db.query('api::responsable.responsable').delete({
        where: { id },
      });
      if (!responsableEliminado) {
        return ctx.notFound('Responsable no encontrado');
      }
      return responsableEliminado;
    } catch (err) {
      // Registra el error y lanza una excepción
      logger.error(`Error en delete: ${err.message}`);
      ctx.throw(500, 'Internal Server Error');
    }
  },
};
