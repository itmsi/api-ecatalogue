/**
 * Swagger Path Definitions for Item Catalog Transmission Module
 */

const itemCatalogTransmissionPaths = {
  '/item_catalog_transmission/get': {
    post: {
      tags: ['Item Catalog Transmission'],
      summary: 'Get list item catalog transmission dengan filter',
      description: 'Retrieve a paginated list of item catalog transmissions with optional search and filtering',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ItemCatalogTransmissionGetInput' },
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
                  data: { $ref: '#/components/schemas/ItemCatalogTransmissionPaginationResponse' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/item_catalog_transmission/create': {
    post: {
      tags: ['Item Catalog Transmission'],
      summary: 'Create new item catalog transmission',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ItemCatalogTransmissionCreateInput' }
          }
        }
      },
      responses: {
        201: { description: 'Data berhasil dibuat' }
      }
    }
  },
  '/item_catalog_transmission/{id}': {
    get: {
      tags: ['Item Catalog Transmission'],
      summary: 'Get item catalog transmission by ID',
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
      tags: ['Item Catalog Transmission'],
      summary: 'Update item catalog transmission',
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
            schema: { $ref: '#/components/schemas/ItemCatalogTransmissionCreateInput' }
          }
        }
      },
      responses: {
        200: { description: 'Data berhasil diupdate' },
        404: { description: 'Data tidak ditemukan' }
      }
    },
    delete: {
      tags: ['Item Catalog Transmission'],
      summary: 'Soft delete item catalog transmission',
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

module.exports = itemCatalogTransmissionPaths;

