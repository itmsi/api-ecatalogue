#!/usr/bin/env node

/**
 * Script untuk menjalankan migration database
 * Menambahkan kolom master_catalog ke tabel master_pdf
 */

const knex = require('knex');
const knexfile = require('./src/knexfile');

async function runMigration() {
  const environment = process.env.NODE_ENV || 'development';
  const config = knexfile[environment];
  
  if (!config) {
    console.error(`Environment '${environment}' not found in knexfile`);
    process.exit(1);
  }
  
  const db = knex(config);
  
  try {
    console.log(`Running migration for environment: ${environment}`);
    console.log('Migration: Add master_catalog column to master_pdf table');
    
    // Jalankan migration
    await db.migrate.latest();
    
    console.log('✅ Migration completed successfully!');
    
    // Verifikasi kolom sudah ditambahkan
    const tableInfo = await db.raw(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'master_pdf' 
      AND column_name = 'master_catalog'
    `);
    
    if (tableInfo.rows.length > 0) {
      console.log('✅ Column master_catalog successfully added to master_pdf table');
      console.log('Column details:', tableInfo.rows[0]);
    } else {
      console.log('⚠️  Column master_catalog not found. Please check migration.');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

// Jalankan migration
runMigration();
