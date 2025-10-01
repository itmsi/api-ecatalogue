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

// Tambahkan routes module Anda di sini
// Example:
// const yourModule = require('../../modules/yourModule')
// routing.use(`${API_TAG}/your-endpoint`, yourModule)

module.exports = routing;
