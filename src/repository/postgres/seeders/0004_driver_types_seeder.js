/**
 * Seeder: Driver Types data
 * Seed data untuk tabel driver_types
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('driver_types').del();
  
  // Insert seed data
  await knex('driver_types').insert([
    {
      driver_type_id: knex.raw('uuid_generate_v4()'),
      driver_type_code: 'MANUAL',
      driver_type_name: 'Manual Transmission',
      driver_type_description: 'Sistem transmisi manual dengan pedal kopling',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
       updated_by: 'admin',
      is_delete: false
    },
    {
      driver_type_id: knex.raw('uuid_generate_v4()'),
      driver_type_code: 'AUTO',
      driver_type_name: 'Automatic Transmission',
      driver_type_description: 'Transmisi otomatis tanpa pedal kopling',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
       updated_by: 'admin',
      is_delete: false
    },
    {
      driver_type_id: knex.raw('uuid_generate_v4()'),
      driver_type_code: 'CVT',
      driver_type_name: 'CVT Transmission',
      driver_type_description: 'Continuously Variable Transmission',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
       updated_by: 'admin',
      is_delete: false
    },
    {
      driver_type_id: knex.raw('uuid_generate_v4()'),
      driver_type_code: 'SEMI',
      driver_type_name: 'Semi Automatic',
      driver_type_description: 'Transmisi semi otomatis dengan mode manual',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
       updated_by: 'admin',
      is_delete: false
    },
    {
      driver_type_id: knex.raw('uuid_generate_v4()'),
      driver_type_code: 'DUAL',
      driver_type_name: 'Dual Clutch',
      driver_type_description: 'Transmisi dengan dua kopling untuk performa optimal',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
      updated_by: 'admin',
      is_delete: false
    }
  ]);
};
