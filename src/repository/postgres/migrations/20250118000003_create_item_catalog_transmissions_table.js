/**
 * Migration: Create item_catalog_transmissions table
 * Tabel untuk menyimpan item katalog transmission
 */

exports.up = function(knex) {
  return knex.schema.createTable('item_catalog_transmissions', (table) => {
    // Primary Key dengan UUID
    table.uuid('item_catalog_transmission_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
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
    
    // Foreign Key ke transmissions
    table.uuid('transmission_id').nullable();
    table.foreign('transmission_id').references('transmission_id').inTable('transmissions').onDelete('SET NULL').onUpdate('CASCADE');
    
    // Foreign Key ke type_transmissions
    table.uuid('type_transmission_id').nullable();
    table.foreign('type_transmission_id').references('type_transmission_id').inTable('type_transmissions').onDelete('SET NULL').onUpdate('CASCADE');
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['deleted_at'], 'idx_item_catalog_transmissions_deleted_at');
    table.index(['is_delete'], 'idx_item_catalog_transmissions_is_delete');
    table.index(['created_at'], 'idx_item_catalog_transmissions_created_at');
    table.index(['master_pdf_id'], 'idx_item_catalog_transmissions_master_pdf_id');
    table.index(['transmission_id'], 'idx_item_catalog_transmissions_transmission_id');
    table.index(['type_transmission_id'], 'idx_item_catalog_transmissions_type_transmission_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('item_catalog_transmissions');
};

