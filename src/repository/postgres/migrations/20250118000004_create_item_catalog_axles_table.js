/**
 * Migration: Create item_catalog_axles table
 * Tabel untuk menyimpan item katalog axle
 */

exports.up = function(knex) {
  return knex.schema.createTable('item_catalog_axles', (table) => {
    // Primary Key dengan UUID
    table.uuid('item_catalog_axle_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Foreign Key ke master_pdf
    table.uuid('master_pdf_id').nullable();
    table.foreign('master_pdf_id').references('master_pdf_id').inTable('master_pdf').onDelete('SET NULL').onUpdate('CASCADE');
    
    // Data fields
    table.string('target_id', 255).nullable();
    table.string('diagram_serial_number', 255).nullable();
    table.string('part_number', 255).nullable();
    table.string('catalog_item_name_en', 255).nullable();
    table.string('catalog_item_name_ch', 255).nullable();
    table.text('description').nullable();
    table.integer('quantity').nullable();
    
    // Foreign Key ke axels
    table.uuid('axel_id').nullable();
    table.foreign('axel_id').references('axel_id').inTable('axels').onDelete('SET NULL').onUpdate('CASCADE');
    
    // Foreign Key ke type_axels
    table.uuid('type_axel_id').nullable();
    table.foreign('type_axel_id').references('type_axel_id').inTable('type_axels').onDelete('SET NULL').onUpdate('CASCADE');
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['deleted_at'], 'idx_item_catalog_axles_deleted_at');
    table.index(['is_delete'], 'idx_item_catalog_axles_is_delete');
    table.index(['created_at'], 'idx_item_catalog_axles_created_at');
    table.index(['master_pdf_id'], 'idx_item_catalog_axles_master_pdf_id');
    table.index(['axel_id'], 'idx_item_catalog_axles_axel_id');
    table.index(['type_axel_id'], 'idx_item_catalog_axles_type_axel_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('item_catalog_axles');
};

