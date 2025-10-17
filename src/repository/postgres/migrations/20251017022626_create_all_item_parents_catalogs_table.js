/**
 * Migration: Create all_item_parents_catalogs table
 * Tabel untuk menyimpan informasi parent dari semua jenis item catalog
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('all_item_parents_catalogs', (table) => {
    // Primary Key dengan UUID
    table.uuid('all_item_parents_catalog_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Foreign Key ke master_pdf
    table.uuid('master_pdf_id').notNullable();
    
    // Data fields sesuai permintaan
    table.enum('master_catalog', ['engine', 'axle', 'cabin', 'steering', 'transmission']).notNullable();
    table.uuid('master_category_id').nullable(); // engine_id, axle_id, cabin_id, steering_id, transmission_id
    table.uuid('type_category_id').nullable(); // type_engine_id, type_axle_id, type_cabin_id, type_steering_id, type_transmission_id
    
    // File foto yang dikelompokkan
    table.text('file_foto').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Foreign key constraints
    table.foreign('master_pdf_id').references('master_pdf_id').inTable('master_pdf').onDelete('CASCADE');
    
    // Indexes untuk performa query yang lebih baik
    table.index(['master_pdf_id'], 'idx_all_item_parents_catalogs_master_pdf_id');
    table.index(['master_catalog'], 'idx_all_item_parents_catalogs_master_catalog');
    table.index(['master_category_id'], 'idx_all_item_parents_catalogs_master_category_id');
    table.index(['type_category_id'], 'idx_all_item_parents_catalogs_type_category_id');
    table.index(['deleted_at'], 'idx_all_item_parents_catalogs_deleted_at');
    table.index(['is_delete'], 'idx_all_item_parents_catalogs_is_delete');
    table.index(['created_at'], 'idx_all_item_parents_catalogs_created_at');
    
    // Composite index untuk query yang sering digunakan
    table.index(['master_pdf_id', 'master_catalog'], 'idx_all_item_parents_catalogs_master_pdf_catalog');
    table.index(['master_pdf_id', 'master_category_id', 'type_category_id'], 'idx_all_item_parents_catalogs_composite');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('all_item_parents_catalogs');
};
