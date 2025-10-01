/**
 * Migration: Create catalog_items table
 * Migration untuk membuat tabel catalog_items dengan struktur yang diminta
 */

exports.up = function(knex) {
  return knex.schema.createTable('catalog_items', (table) => {
    // Primary Key dengan UUID
    table.uuid('catalog_item_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Foreign key ke catalogs
    table.uuid('catalog_id').nullable();
    table.foreign('catalog_id')
      .references('catalog_id')
      .inTable('catalogs')
      .onDelete('SET NULL')
      .onUpdate('CASCADE');
    
    // Data fields sesuai permintaan
    table.string('target_id', 255).nullable();
    table.string('diagram_serial_number', 255).nullable();
    table.string('part_number', 255).nullable();
    table.string('catalog_item_name_en', 255).nullable();
    table.string('catalog_item_name_ch', 255).nullable();
    table.integer('catalog_item_quantity').defaultTo(0);
    table.text('catalog_item_description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['catalog_id'], 'idx_catalog_items_catalog_id');
    table.index(['deleted_at'], 'idx_catalog_items_deleted_at');
    table.index(['is_delete'], 'idx_catalog_items_is_delete');
    table.index(['created_at'], 'idx_catalog_items_created_at');
    table.index(['part_number'], 'idx_catalog_items_part_number');
    table.index(['target_id'], 'idx_catalog_items_target_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('catalog_items');
};

