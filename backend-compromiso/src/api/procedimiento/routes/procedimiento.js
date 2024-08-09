'use strict';

/**
 * @type {import('@strapi/strapi').Strapi}
 */
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/procedimientos',
      handler: 'procedimiento.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/procedimientos/:id',
      handler: 'procedimiento.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/procedimientos',
      handler: 'procedimiento.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/procedimientos/:id',
      handler: 'procedimiento.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/procedimientos/:id',
      handler: 'procedimiento.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
