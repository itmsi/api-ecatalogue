/**
 * Migration: Create productions_detail table
 * Production detail data with relationships to engines, steering, cabine, axle, and transmission
 */

exports.up = function(knex) {
  return knex.schema.createTable('productions_detail', (table) => {
    // Primary Key with UUID
    table.uuid('production_detail_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Foreign Key to productions table
    table.uuid('production_id').nullable();
    
    // Production Detail Fields
    table.text('production_detail_description').nullable();
    
    // Foreign Keys (nullable) to related tables
    table.uuid('engine_id').nullable();
    table.uuid('steering_id').nullable();
    table.uuid('cabine_id').nullable();
    table.uuid('axle_id').nullable();
    table.uuid('transmission_id').nullable();
    
    // Audit Fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes for better query performance
    table.index(['production_id'], 'idx_productions_detail_production_id');
    table.index(['deleted_at'], 'idx_productions_detail_deleted_at');
    table.index(['created_at'], 'idx_productions_detail_created_at');
    table.index(['engine_id'], 'idx_productions_detail_engine_id');
    table.index(['steering_id'], 'idx_productions_detail_steering_id');
    table.index(['cabine_id'], 'idx_productions_detail_cabine_id');
    table.index(['axle_id'], 'idx_productions_detail_axle_id');
    table.index(['transmission_id'], 'idx_productions_detail_transmission_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('productions_detail');
};

