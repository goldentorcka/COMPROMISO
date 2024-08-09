'use strict';

// Importa el logger desde la ruta correcta
const logger = require('../../utils/logger');

module.exports = {
  // Action to fetch all procedimientos
  async find(ctx) {
    try {
      const procedimientos = await strapi.db.query('api::procedimiento.procedimiento').findMany({
        where: ctx.query,
        populate: '*', // Populate any relations if needed
      });
      return procedimientos;
    } catch (err) {
      // Registra el error y lanza una excepción
      logger.error(`Error in find: ${err.message}`);
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Action to fetch a single procedimiento by ID
  async findOne(ctx) {
    const { id } = ctx.params;
    try {
      const procedimiento = await strapi.db.query('api::procedimiento.procedimiento').findOne({
        where: { id },
        populate: '*', // Populate any relations if needed
      });
      if (!procedimiento) {
        return ctx.notFound('Procedimiento not found');
      }
      return procedimiento;
    } catch (err) {
      // Registra el error y lanza una excepción
      logger.error(`Error in findOne: ${err.message}`);
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Action to create a new procedimiento
  async create(ctx) {
    try {
      const data = ctx.request.body; // Usa ctx.request.body directamente
      const newProcedimiento = await strapi.db.query('api::procedimiento.procedimiento').create({
        data: data,
      });
      return newProcedimiento;
    } catch (err) {
      // Registra el error y lanza una excepción
      logger.error(`Error in create: ${err.message}`);
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Action to update an existing procedimiento
  async update(ctx) {
    const { id } = ctx.params;
    try {
      const data = ctx.request.body; // Usa ctx.request.body directamente
      const updatedProcedimiento = await strapi.db.query('api::procedimiento.procedimiento').update({
        where: { id },
        data: data,
      });
      if (!updatedProcedimiento) {
        return ctx.notFound('Procedimiento not found');
      }
      return updatedProcedimiento;
    } catch (err) {
      // Registra el error y lanza una excepción
      logger.error(`Error in update: ${err.message}`);
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Action to delete a procedimiento
  async delete(ctx) {
    const { id } = ctx.params;
    try {
      const deletedProcedimiento = await strapi.db.query('api::procedimiento.procedimiento').delete({
        where: { id },
      });
      if (!deletedProcedimiento) {
        return ctx.notFound('Procedimiento not found');
      }
      return deletedProcedimiento;
    } catch (err) {
      // Registra el error y lanza una excepción
      logger.error(`Error in delete: ${err.message}`);
      ctx.throw(500, 'Internal Server Error');
    }
  },
};
