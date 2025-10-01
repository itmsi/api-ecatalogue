const info = {
  description: 'Express.js API Boilerplate - Template untuk pengembangan REST API dengan fitur lengkap',
  version: '1.0.0',
  title: 'Express.js API Boilerplate Documentation',
  contact: {
    email: 'your-email@example.com'
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT'
  }
}

const servers = [
  {
    url: '/api/catalogs/',
    description: 'Development server'
  },
  {
    url: 'https://your-production-url.com/api/catalogs/',
    description: 'Production server'
  }
]

// Import schemas
// Tambahkan schema module Anda di sini
const exampleSchema = require('./schema/example');
const categorySchema = require('./schema/category');
const catalogSchema = require('./schema/catalog');

// Import paths
// Tambahkan path module Anda di sini
const examplePaths = require('./path/example');
const categoryPaths = require('./path/category');
const catalogPaths = require('./path/catalog');

// Combine all schemas
const schemas = {
  ...exampleSchema,
  ...categorySchema,
  ...catalogSchema,
  // ...yourModuleSchema,
};

// Combine all paths
const paths = {
  ...examplePaths,
  ...categoryPaths,
  ...catalogPaths,
  // ...yourModulePaths,
};

const index = {
  openapi: '3.0.0',
  info,
  servers,
  paths,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas
  }
}

module.exports = {
  index
}
