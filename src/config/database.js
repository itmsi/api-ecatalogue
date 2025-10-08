const knex = require('knex')

const knexfile = require('../knexfile')

const env = process.env.NODE_ENV || 'development'
const configCore = knexfile[env]

const db = knex(configCore);

module.exports = {
  pgCore: db
};

// Export langsung untuk backward compatibility
module.exports.default = db;
