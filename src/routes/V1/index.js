const express = require('express')
// const { verifyToken } = require('../../middlewares')

const routing = express();
const API_TAG = '/api/catalogs';

/* RULE
naming convention endpoint: using plural
Example:
- GET /api/examples
- POST /api/examples
- GET /api/examples/:id
- PUT /api/examples/:id
- DELETE /api/examples/:id
*/

// Example Module (Template untuk module Anda)
const exampleModule = require('../../modules/example')
routing.use(`${API_TAG}/examples`, exampleModule)

// Category Module
const categoryModule = require('../../modules/category')
routing.use(`${API_TAG}/categories`, categoryModule)

// Catalog Module
const catalogModule = require('../../modules/catalog')
routing.use(`${API_TAG}/catalogs`, catalogModule)

// Catalog Items Module
const catalogItemsModule = require('../../modules/catalogItems')
routing.use(`${API_TAG}/catalogItems`, catalogItemsModule)

// Locations Module
const locationsModule = require('../../modules/locations')
routing.use(`${API_TAG}/locations`, locationsModule)

// Driver Types Module
const driverTypesModule = require('../../modules/driverTypes')
routing.use(`${API_TAG}/driver_types`, driverTypesModule)

// Vehicle Weight Module
const vehicleWeightModule = require('../../modules/vehicleWeight')
routing.use(`${API_TAG}/vehicle_weights`, vehicleWeightModule)

// Brands Module
const brandsModule = require('../../modules/brands')
routing.use(`${API_TAG}/brands`, brandsModule)

// World Manufacturing Plants Module
const worldManufacturingPlantModule = require('../../modules/worldManufacturingPlant')
routing.use(`${API_TAG}/world_manufacturing_plants`, worldManufacturingPlantModule)

// Production Module
const productionModule = require('../../modules/production')
routing.use(`${API_TAG}/productions`, productionModule)

// Sidebar Module
const sidebarModule = require('../../modules/sidebar')
routing.use(`${API_TAG}/sidebars`, sidebarModule)

// Type Cabine Module
const typeCabineModule = require('../../modules/typeCabine')
routing.use(`${API_TAG}/type_cabine`, typeCabineModule)

// Cabines Module
const cabinesModule = require('../../modules/cabines')
routing.use(`${API_TAG}/cabines`, cabinesModule)

// Type Engine Module
const typeEngineModule = require('../../modules/typeEngine')
routing.use(`${API_TAG}/type_engine`, typeEngineModule)

// Engines Module
const enginesModule = require('../../modules/engines')
routing.use(`${API_TAG}/engines`, enginesModule)

// Type Transmission Module
const typeTransmissionModule = require('../../modules/typeTransmission')
routing.use(`${API_TAG}/type_transmission`, typeTransmissionModule)

// Transmission Module
const transmissionModule = require('../../modules/transmission')
routing.use(`${API_TAG}/transmission`, transmissionModule)

// Type Axel Module
const typeAxelModule = require('../../modules/typeAxel')
routing.use(`${API_TAG}/type_axel`, typeAxelModule)

// Tambahkan routes module Anda di sini
// Example:
// const yourModule = require('../../modules/yourModule')
// routing.use(`${API_TAG}/your-endpoint`, yourModule)

module.exports = routing;
