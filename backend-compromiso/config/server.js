const { env } = require('process');

const config = {
  host: env.HOST || '0.0.0.0',
  port: parseInt(env.PORT, 10) || 1337,
  app: {
    keys: env.APP_KEYS ? env.APP_KEYS.split(',') : [],
  },
  webhooks: {
    populateRelations: env.WEBHOOKS_POPULATE_RELATIONS === 'true',
  },
  admin: {
    auth: {
      secret: env.ADMIN_JWT_SECRET || 'someSecret',
    },
    apiToken: {
      salt: env.API_TOKEN_SALT || 'someSalt',
    },
  },
};

module.exports = config;
