/**
 * Migration: Create brands table
 * Migration untuk membuat tabel brands sesuai permintaan
 */

exports.up = function(knex) {
  return knex.schema.createTable('brands', (table) => {
    // Primary Key dengan UUID
    table.uuid('brand_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Data fields sesuai permintaan
    table.string('brand_code', 255).nullable();
    table.string('brand_name', 255).nullable();
    table.text('brand_description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['deleted_at'], 'idx_brands_deleted_at');
    table.index(['is_delete'], 'idx_brands_is_delete');
    table.index(['created_at'], 'idx_brands_created_at');
    table.index(['brand_name'], 'idx_brands_name');
    table.index(['brand_code'], 'idx_brands_code');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('brands');
};
