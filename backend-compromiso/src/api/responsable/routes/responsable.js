'use strict';

/**
 * @type {import('@strapi/strapi').Strapi}
 */
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/responsables',
      handler: 'responsable.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/responsables/:id',
      handler: 'responsable.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/responsables',
      handler: 'responsable.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/responsables/:id',
      handler: 'responsable.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/responsables/:id',
      handler: 'responsable.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
