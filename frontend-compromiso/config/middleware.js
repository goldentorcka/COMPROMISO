export default [
    'strapi::errors',
    'strapi::security',
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
    {
      name: 'strapi::logger',
      config: {
        level: 'warn',
        exposeInContext: true,
        requests: true,
        filename: 'Logger.log',
        folder: './logs',
      },
    },
  ]

  
  