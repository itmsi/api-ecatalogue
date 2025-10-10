/**
 * Swagger Path Definitions for Item Catalog Cabine Module
 */

const itemCatalogCabinePaths = {
  '/item_catalog_cabine/get': {
    post: {
      tags: ['Item Catalog Cabine'],
      summary: 'Get list item catalog cabine dengan filter',
      description: 'Retrieve a paginated list of item catalog cabines with optional search and filtering',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ItemCatalogCabineGetInput' },
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
                  data: { $ref: '#/components/schemas/ItemCatalogCabinePaginationResponse' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/item_catalog_cabine/create': {
    post: {
      tags: ['Item Catalog Cabine'],
      summary: 'Create new item catalog cabine',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ItemCatalogCabineCreateInput' }
          }
        }
      },
      responses: {
        201: { description: 'Data berhasil dibuat' }
      }
    }
  },
  '/item_catalog_cabine/{id}': {
    get: {
      tags: ['Item Catalog Cabine'],
      summary: 'Get item catalog cabine by ID',
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
      tags: ['Item Catalog Cabine'],
      summary: 'Update item catalog cabine',
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
            schema: { $ref: '#/components/schemas/ItemCatalogCabineCreateInput' }
          }
        }
      },
      responses: {
        200: { description: 'Data berhasil diupdate' },
        404: { description: 'Data tidak ditemukan' }
      }
    },
    delete: {
      tags: ['Item Catalog Cabine'],
      summary: 'Soft delete item catalog cabine',
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

module.exports = itemCatalogCabinePaths;

