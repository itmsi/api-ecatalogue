/**
 * Migration: Add master_catalog column to master_pdf table
 * Menambahkan kolom master_catalog untuk menyimpan jenis katalog (engine, axle, cabin, steering, transmission)
 */

exports.up = function(knex) {
  return knex.schema.alterTable('master_pdf', (table) => {
    // Tambahkan kolom master_catalog
    table.enum('master_catalog', ['engine', 'axle', 'cabin', 'steering', 'transmission'])
      .nullable()
      .comment('Jenis katalog: engine, axle, cabin, steering, atau transmission');
    
    // Tambahkan index untuk performa query yang lebih baik
    table.index(['master_catalog'], 'idx_master_pdf_master_catalog');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('master_pdf', (table) => {
    // Hapus index terlebih dahulu
    table.dropIndex(['master_catalog'], 'idx_master_pdf_master_catalog');
    
    // Hapus kolom master_catalog
    table.dropColumn('master_catalog');
  });
};
