'use strict';

/**
 * @type {import('@strapi/strapi').Strapi}
 */
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/procesos',
      handler: 'proceso.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/procesos/:id',
      handler: 'proceso.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/procesos',
      handler: 'proceso.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/procesos/:id',
      handler: 'proceso.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/procesos/:id',
      handler: 'proceso.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
