/**
 * Migration: Create steerings_type_steerings table
 * Migration untuk membuat tabel relasi many-to-many antara steerings dan type_steerings
 */

exports.up = function(knex) {
  return knex.schema.createTable('steerings_type_steerings', (table) => {
    // Primary Key
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Foreign keys
    table.uuid('steering_id').notNullable();
    table.foreign('steering_id')
      .references('steering_id')
      .inTable('steerings')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    
    table.uuid('type_steering_id').notNullable();
    table.foreign('type_steering_id')
      .references('type_steering_id')
      .inTable('type_steerings')
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
    table.unique(['steering_id', 'type_steering_id'], 'unique_steerings_type_steerings');
    
    // Indexes untuk performa query yang lebih baik
    table.index(['steering_id'], 'idx_steerings_type_steerings_steering_id');
    table.index(['type_steering_id'], 'idx_steerings_type_steerings_type_steering_id');
    table.index(['deleted_at'], 'idx_steerings_type_steerings_deleted_at');
    table.index(['is_delete'], 'idx_steerings_type_steerings_is_delete');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('steerings_type_steerings');
};

