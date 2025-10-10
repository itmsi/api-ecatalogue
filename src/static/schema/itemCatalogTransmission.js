/**
 * Swagger Schema Definitions for Item Catalog Transmission Module
 */

const itemCatalogTransmissionSchemas = {
  ItemCatalogTransmission: {
    type: 'object',
    properties: {
      item_catalog_transmission_id: { type: 'string', format: 'uuid' },
      master_pdf_id: { type: 'string', format: 'uuid' },
      transmission_id: { type: 'string', format: 'uuid', nullable: true },
      type_transmission_id: { type: 'string', format: 'uuid', nullable: true },
      target_id: { type: 'string', nullable: true },
      diagram_serial_number: { type: 'string', nullable: true },
      part_number: { type: 'string', nullable: true },
      catalog_item_name_en: { type: 'string', nullable: true },
      catalog_item_name_ch: { type: 'string', nullable: true },
      description: { type: 'string', nullable: true },
      quantity: { type: 'integer', nullable: true },
      created_at: { type: 'string', format: 'date-time' },
      created_by: { type: 'string', format: 'uuid', nullable: true },
      updated_at: { type: 'string', format: 'date-time' },
      updated_by: { type: 'string', format: 'uuid', nullable: true }
    }
  },
  ItemCatalogTransmissionGetInput: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, example: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100, example: 10 },
      search: { type: 'string', example: '' },
      sort_by: { type: 'string', example: 'created_at' },
      sort_order: { type: 'string', enum: ['asc', 'desc'], example: 'desc' },
      master_pdf_id: { type: 'string', format: 'uuid', nullable: true }
    }
  },
  ItemCatalogTransmissionCreateInput: {
    type: 'object',
    required: ['name_pdf', 'data_items'],
    properties: {
      name_pdf: { type: 'string' },
      data_items: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          properties: {
            transmission_id: { type: 'string', format: 'uuid', nullable: true },
            type_transmission_id: { type: 'string', format: 'uuid', nullable: true },
            target_id: { type: 'string', nullable: true },
            diagram_serial_number: { type: 'string', nullable: true },
            part_number: { type: 'string', nullable: true },
            catalog_item_name_en: { type: 'string', nullable: true },
            catalog_item_name_ch: { type: 'string', nullable: true },
            description: { type: 'string', nullable: true },
            quantity: { type: 'integer', nullable: true }
          }
        }
      }
    }
  },
  ItemCatalogTransmissionPaginationResponse: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: { $ref: '#/components/schemas/ItemCatalogTransmission' }
      },
      pagination: {
        type: 'object',
        properties: {
          page: { type: 'integer' },
          limit: { type: 'integer' },
          total: { type: 'integer' },
          totalPages: { type: 'integer' }
        }
      }
    }
  }
};

module.exports = itemCatalogTransmissionSchemas;

