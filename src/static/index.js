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
const productionSchema = require('./schema/production');
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
const productionPaths = require('./path/production');
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
const typeAxelSchema = require('./schema/typeAxel');
const typeAxelPaths = require('./path/typeAxel');
const axelSchema = require('./schema/axel');
const axelPaths = require('./path/axel');
const typeSteeringSchema = require('./schema/typeSteering');
const typeSteeringPaths = require('./path/typeSteering');
const steeringSchema = require('./schema/steering');
const steeringPaths = require('./path/steering');
const itemCatalogEngineSchema = require('./schema/itemCatalogEngine');
const itemCatalogEnginePaths = require('./path/itemCatalogEngine');
const itemCatalogTransmissionSchema = require('./schema/itemCatalogTransmission');
const itemCatalogTransmissionPaths = require('./path/itemCatalogTransmission');
const itemCatalogAxleSchema = require('./schema/itemCatalogAxle');
const itemCatalogAxlePaths = require('./path/itemCatalogAxle');
const itemCatalogSteeringSchema = require('./schema/itemCatalogSteering');
const itemCatalogSteeringPaths = require('./path/itemCatalogSteering');
const itemCatalogCabineSchema = require('./schema/itemCatalogCabine');
const itemCatalogCabinePaths = require('./path/itemCatalogCabine');
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
  ...productionSchema,
  // ...sidebarSchema,
  ...typeCabineSchema,
  ...cabinesSchema,
  ...typeEngineSchema,
  ...enginesSchema,
  ...typeTransmissionSchema,
  ...transmissionSchema,
  ...typeAxelSchema,
  ...axelSchema,
  ...typeSteeringSchema,
  ...steeringSchema,
  ...itemCatalogEngineSchema,
  ...itemCatalogTransmissionSchema,
  ...itemCatalogAxleSchema,
  ...itemCatalogSteeringSchema,
  ...itemCatalogCabineSchema,
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
  ...productionPaths,
  // ...sidebarPaths,
  ...typeCabinePaths,
  ...cabinesPaths,
  ...typeEnginePaths,
  ...enginesPaths,
  ...typeTransmissionPaths,
  ...transmissionPaths,
  ...typeAxelPaths,
  ...axelPaths,
  ...typeSteeringPaths,
  ...steeringPaths,
  ...itemCatalogEnginePaths,
  ...itemCatalogTransmissionPaths,
  ...itemCatalogAxlePaths,
  ...itemCatalogSteeringPaths,
  ...itemCatalogCabinePaths,
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
