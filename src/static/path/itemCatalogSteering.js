/**
 * Swagger Path Definitions for Item Catalog Steering Module
 */

const itemCatalogSteeringPaths = {
  '/item_catalog_steering/get': {
    post: {
      tags: ['Item Catalog Steering'],
      summary: 'Get list item catalog steering dengan filter',
      description: 'Retrieve a paginated list of item catalog steerings with optional search and filtering',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ItemCatalogSteeringGetInput' },
            example: {
              page: 1,
              limit: 10,
              search: '',
              sort_by: 'created_at',
              sort_order: 'desc',
              master_pdf_id: '550e8400-e29b-41d4-a716-446655440000'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Success' },
                  data: { $ref: '#/components/schemas/ItemCatalogSteeringPaginationResponse' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/item_catalog_steering/create': {
    post: {
      tags: ['Item Catalog Steering'],
      summary: 'Create new item catalog steering',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ItemCatalogSteeringCreateInput' }
          }
        }
      },
      responses: {
        201: { description: 'Data berhasil dibuat' }
      }
    }
  },
  '/item_catalog_steering/{id}': {
    get: {
      tags: ['Item Catalog Steering'],
      summary: 'Get item catalog steering by ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' }
        }
      ],
      responses: {
        200: { description: 'Success' },
        404: { description: 'Data tidak ditemukan' }
      }
    },
    put: {
      tags: ['Item Catalog Steering'],
      summary: 'Update item catalog steering',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ItemCatalogSteeringCreateInput' }
          }
        }
      },
      responses: {
        200: { description: 'Data berhasil diupdate' },
        404: { description: 'Data tidak ditemukan' }
      }
    },
    delete: {
      tags: ['Item Catalog Steering'],
      summary: 'Soft delete item catalog steering',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' }
        }
      ],
      responses: {
        200: { description: 'Data berhasil dihapus' },
        404: { description: 'Data tidak ditemukan' }
      }
    }
  }
};

module.exports = itemCatalogSteeringPaths;

