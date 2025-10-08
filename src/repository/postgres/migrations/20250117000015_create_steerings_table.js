/**
 * Migration: Create steerings table
 * Migration untuk membuat tabel steerings dengan struktur yang diminta
 */

exports.up = function(knex) {
  return knex.schema.createTable('steerings', (table) => {
    // Primary Key dengan UUID
    table.uuid('steering_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Data fields sesuai permintaan
    table.string('steering_name_en', 255).nullable();
    table.string('steering_name_cn', 255).nullable();
    table.text('steering_description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['deleted_at'], 'idx_steerings_deleted_at');
    table.index(['is_delete'], 'idx_steerings_is_delete');
    table.index(['created_at'], 'idx_steerings_created_at');
    table.index(['steering_name_en'], 'idx_steerings_name_en');
    table.index(['steering_name_cn'], 'idx_steerings_name_cn');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('steerings');
};

