/**
 * Seeder: Locations data
 * Seed data untuk tabel locations
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('locations').del();
  
  // Insert seed data
  await knex('locations').insert([
    {
      location_id: knex.raw('uuid_generate_v4()'),
      location_code: 'JKT01',
      location_name: 'Jakarta Pusat',
      location_description: 'Lokasi utama di Jakarta Pusat untuk operasional',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
      updated_by: 'admin',
      is_delete: false
    },
    {
      location_id: knex.raw('uuid_generate_v4()'),
      location_code: 'SBY01',
      location_name: 'Surabaya',
      location_description: 'Kantor cabang Surabaya untuk wilayah timur',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
      updated_by: 'admin',
      is_delete: false
    },
    {
      location_id: knex.raw('uuid_generate_v4()'),
      location_code: 'MDN01',
      location_name: 'Medan',
      location_description: 'Kantor cabang Medan untuk wilayah Sumatera',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
      updated_by: 'admin',
      is_delete: false
    },
    {
      location_id: knex.raw('uuid_generate_v4()'),
      location_code: 'BDG01',
      location_name: 'Bandung',
      location_description: 'Gudang pusat Bandung untuk distribusi ke Jawa Barat',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
      updated_by: 'admin',
      is_delete: false
    },
    {
      location_id: knex.raw('uuid_generate_v4()'),
      location_code: 'MKS01',
      location_name: 'Makassar',
      location_description: 'Distribusi center Makassar untuk wilayah Indonesia timur',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
      updated_by: 'admin',
      is_delete: false
    }
  ]);
};
