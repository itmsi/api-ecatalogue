/**
 * Migration: Create catalogs table
 * Migration untuk membuat tabel catalogs dengan struktur yang diminta
 */

exports.up = function(knex) {
  return knex.schema.createTable('catalogs', (table) => {
    // Primary Key dengan UUID
    table.uuid('catalog_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Foreign key ke categories
    table.uuid('category_id').nullable();
    table.foreign('category_id')
      .references('category_id')
      .inTable('categories')
      .onDelete('SET NULL')
      .onUpdate('CASCADE');
    
    // Self-referencing foreign key untuk parent catalog
    table.uuid('catalog_parent_id').nullable();
    table.foreign('catalog_parent_id')
      .references('catalog_id')
      .inTable('catalogs')
      .onDelete('SET NULL')
      .onUpdate('CASCADE');
    
    // Data fields sesuai permintaan
    table.string('target_id', 255).nullable();
    table.string('diagram_serial_number', 255).nullable();
    table.string('part_number', 255).nullable();
    table.string('catalog_name_en', 255).nullable();
    table.string('catalog_name_ch', 255).nullable();
    table.integer('catalog_quantity').defaultTo(0);
    table.text('catalog_image').nullable();
    table.text('catalog_description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['category_id'], 'idx_catalogs_category_id');
    table.index(['catalog_parent_id'], 'idx_catalogs_parent_id');
    table.index(['deleted_at'], 'idx_catalogs_deleted_at');
    table.index(['is_delete'], 'idx_catalogs_is_delete');
    table.index(['created_at'], 'idx_catalogs_created_at');
    table.index(['part_number'], 'idx_catalogs_part_number');
    table.index(['target_id'], 'idx_catalogs_target_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('catalogs');
};

