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
    url: 'https://services.motorsights.com/api/catalogs/',
    description: 'Gateway server'
  }
]

// Import schemas
// Tambahkan schema module Anda di sini
// const exampleSchema = require('./schema/example');
// const categorySchema = require('./schema/category');
// const catalogSchema = require('./schema/catalog');
// const catalogItemsSchema = require('./schema/catalogItems');
// const locationsSchema = require('./schema/locations');
// const driverTypesSchema = require('./schema/driverTypes');
// const vehicleWeightsSchema = require('./schema/vehicleWeight');
// const brandsSchema = require('./schema/brands');
// const worldManufacturingPlantSchema = require('./schema/worldManufacturingPlant');
// const productionSchema = require('./schema/production');
// const sidebarSchema = require('./schema/sidebar');
const cabinesSchema = require('./schema/cabines');

// Import paths
// Tambahkan path module Anda di sini
// const examplePaths = require('./path/example');
// const categoryPaths = require('./path/category');
// const catalogPaths = require('./path/catalog');
// const catalogItemsPaths = require('./path/catalogItems');
// const locationsPaths = require('./path/locations');
// const driverTypesPaths = require('./path/driverTypes');
// const vehicleWeightsPaths = require('./path/vehicleWeight');
// const brandsPaths = require('./path/brands');
// const worldManufacturingPlantPaths = require('./path/worldManufacturingPlant');
// const productionPaths = require('./path/production');
// const sidebarPaths = require('./path/sidebar');
const typeCabineSchema = require('./schema/typeCabine');
const typeCabinePaths = require('./path/typeCabine');
const cabinesPaths = require('./path/cabines');
const typeEngineSchema = require('./schema/typeEngine');
const typeEnginePaths = require('./path/typeEngine');
const enginesSchema = require('./schema/engines');
const enginesPaths = require('./path/engines');
const typeTransmissionSchema = require('./schema/typeTransmission');
const typeTransmissionPaths = require('./path/typeTransmission');
const transmissionSchema = require('./schema/transmission');
const transmissionPaths = require('./path/transmission');
const typeExelSchema = require('./schema/typeExel');
const typeExelPaths = require('./path/typeExel');
// Combine all schemas
const schemas = {
  // ...exampleSchema,
  // ...categorySchema,
  // ...catalogSchema,
  // ...catalogItemsSchema,
  // ...locationsSchema,
  // ...driverTypesSchema,
  // ...vehicleWeightsSchema,
  // ...brandsSchema,
  // ...worldManufacturingPlantSchema,
  // ...productionSchema,
  // ...sidebarSchema,
  ...typeCabineSchema,
  ...cabinesSchema,
  ...typeEngineSchema,
  ...enginesSchema,
  ...typeTransmissionSchema,
  ...transmissionSchema,
  ...typeExelSchema,
  // ...yourModuleSchema,
};

// Combine all paths
const paths = {
  // ...examplePaths,
  // ...categoryPaths,
  // ...catalogPaths,
  // ...catalogItemsPaths,
  // ...locationsPaths,
  // ...driverTypesPaths,
  // ...vehicleWeightsPaths,
  // ...brandsPaths,
  // ...worldManufacturingPlantPaths,
  // ...productionPaths,
  // ...sidebarPaths,
  ...typeCabinePaths,
  ...cabinesPaths,
  ...typeEnginePaths,
  ...enginesPaths,
  ...typeTransmissionPaths,
  ...transmissionPaths,
  ...typeExelPaths,
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
