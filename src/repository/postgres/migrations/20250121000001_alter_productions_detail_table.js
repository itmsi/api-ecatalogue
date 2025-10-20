/**
 * Migration: Alter productions_detail table structure
 * Mengubah struktur tabel productions_detail untuk menggunakan master_pdf_id
 */

exports.up = function(knex) {
  return knex.schema.alterTable('productions_detail', (table) => {
    // Drop kolom-kolom lama yang tidak diperlukan
    table.dropColumn('production_detail_description');
    table.dropColumn('engine_id');
    table.dropColumn('steering_id');
    table.dropColumn('cabine_id');
    table.dropColumn('axle_id');
    table.dropColumn('transmission_id');
    
    // Tambahkan kolom master_pdf_id
    table.uuid('master_pdf_id').nullable().comment('Foreign key ke master_pdf table');
    
    // Tambahkan index untuk master_pdf_id
    table.index(['master_pdf_id'], 'idx_productions_detail_master_pdf_id');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('productions_detail', (table) => {
    // Drop kolom master_pdf_id dan indexnya
    table.dropIndex(['master_pdf_id'], 'idx_productions_detail_master_pdf_id');
    table.dropColumn('master_pdf_id');
    
    // Tambahkan kembali kolom-kolom lama
    table.text('production_detail_description').nullable();
    table.uuid('engine_id').nullable();
    table.uuid('steering_id').nullable();
    table.uuid('cabine_id').nullable();
    table.uuid('axle_id').nullable();
    table.uuid('transmission_id').nullable();
    
    // Tambahkan kembali index untuk kolom lama
    table.index(['engine_id'], 'idx_productions_detail_engine_id');
    table.index(['steering_id'], 'idx_productions_detail_steering_id');
    table.index(['cabine_id'], 'idx_productions_detail_cabine_id');
    table.index(['axle_id'], 'idx_productions_detail_axle_id');
    table.index(['transmission_id'], 'idx_productions_detail_transmission_id');
  });
};
