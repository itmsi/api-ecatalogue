/**
 * Swagger Path Definitions for Item Catalog Axle Module
 */

const itemCatalogAxlePaths = {
  '/item_catalog_axle/get': {
    post: {
      tags: ['Item Catalog Axle'],
      summary: 'Get list item catalog axle dengan filter',
      description: 'Retrieve a paginated list of item catalog axles with optional search and filtering',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ItemCatalogAxleGetInput' },
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
                  data: { $ref: '#/components/schemas/ItemCatalogAxlePaginationResponse' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/item_catalog_axle/create': {
    post: {
      tags: ['Item Catalog Axle'],
      summary: 'Create new item catalog axle',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ItemCatalogAxleCreateInput' }
          }
        }
      },
      responses: {
        201: { description: 'Data berhasil dibuat' }
      }
    }
  },
  '/item_catalog_axle/{id}': {
    get: {
      tags: ['Item Catalog Axle'],
      summary: 'Get item catalog axle by ID',
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
      tags: ['Item Catalog Axle'],
      summary: 'Update item catalog axle',
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
            schema: { $ref: '#/components/schemas/ItemCatalogAxleCreateInput' }
          }
        }
      },
      responses: {
        200: { description: 'Data berhasil diupdate' },
        404: { description: 'Data tidak ditemukan' }
      }
    },
    delete: {
      tags: ['Item Catalog Axle'],
      summary: 'Soft delete item catalog axle',
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

module.exports = itemCatalogAxlePaths;

