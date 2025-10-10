/**
 * Migration: Create item_catalog_steerings table
 * Tabel untuk menyimpan item katalog steering
 */

exports.up = function(knex) {
  return knex.schema.createTable('item_catalog_steerings', (table) => {
    // Primary Key dengan UUID
    table.uuid('item_catalog_steering_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
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
    
    // Foreign Key ke steerings
    table.uuid('steering_id').nullable();
    table.foreign('steering_id').references('steering_id').inTable('steerings').onDelete('SET NULL').onUpdate('CASCADE');
    
    // Foreign Key ke type_steerings
    table.uuid('type_steering_id').nullable();
    table.foreign('type_steering_id').references('type_steering_id').inTable('type_steerings').onDelete('SET NULL').onUpdate('CASCADE');
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['deleted_at'], 'idx_item_catalog_steerings_deleted_at');
    table.index(['is_delete'], 'idx_item_catalog_steerings_is_delete');
    table.index(['created_at'], 'idx_item_catalog_steerings_created_at');
    table.index(['master_pdf_id'], 'idx_item_catalog_steerings_master_pdf_id');
    table.index(['steering_id'], 'idx_item_catalog_steerings_steering_id');
    table.index(['type_steering_id'], 'idx_item_catalog_steerings_type_steering_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('item_catalog_steerings');
};

