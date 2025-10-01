/**
 * Migration: Remove columns from catalogs table
 * Migration untuk menghapus kolom target_id, diagram_serial_number, part_number dari tabel catalogs
 */

exports.up = function(knex) {
  return knex.schema.table('catalogs', (table) => {
    // Drop indexes first
    table.dropIndex(['target_id'], 'idx_catalogs_target_id');
    table.dropIndex(['part_number'], 'idx_catalogs_part_number');
  }).then(() => {
    return knex.schema.table('catalogs', (table) => {
      // Drop columns
      table.dropColumn('target_id');
      table.dropColumn('diagram_serial_number');
      table.dropColumn('part_number');
    });
  });
};

exports.down = function(knex) {
  return knex.schema.table('catalogs', (table) => {
    // Restore columns
    table.string('target_id', 255).nullable();
    table.string('diagram_serial_number', 255).nullable();
    table.string('part_number', 255).nullable();
    
    // Restore indexes
    table.index(['part_number'], 'idx_catalogs_part_number');
    table.index(['target_id'], 'idx_catalogs_target_id');
  });
};

