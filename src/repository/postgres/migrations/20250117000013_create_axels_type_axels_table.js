/**
 * Migration: Create axels_type_axels table
 * Migration untuk membuat tabel relasi many-to-many antara axels dan type_axels
 */

exports.up = function(knex) {
  return knex.schema.createTable('axels_type_axels', (table) => {
    // Primary Key
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Foreign keys
    table.uuid('axel_id').notNullable();
    table.foreign('axel_id')
      .references('axel_id')
      .inTable('axels')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    
    table.uuid('type_axel_id').notNullable();
    table.foreign('type_axel_id')
      .references('type_axel_id')
      .inTable('type_axels')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Unique constraint untuk mencegah duplikasi relasi
    table.unique(['axel_id', 'type_axel_id'], 'unique_axels_type_axels');
    
    // Indexes untuk performa query yang lebih baik
    table.index(['axel_id'], 'idx_axels_type_axels_axel_id');
    table.index(['type_axel_id'], 'idx_axels_type_axels_type_axel_id');
    table.index(['deleted_at'], 'idx_axels_type_axels_deleted_at');
    table.index(['is_delete'], 'idx_axels_type_axels_is_delete');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('axels_type_axels');
};

