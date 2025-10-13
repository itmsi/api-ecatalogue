/**
 * Migration: Alter productions table - change production_sequence_number from integer to varchar(50)
 */

exports.up = function(knex) {
  return knex.schema.alterTable('productions', (table) => {
    // Change production_sequence_number from integer to varchar(50)
    table.string('production_sequence_number', 50).nullable().alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('productions', (table) => {
    // Revert back to integer
    table.integer('production_sequence_number').nullable().alter();
  });
};

