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
    },
    {
      location_id: knex.raw('uuid_generate_v4()'),
      location_code: 'DPS01',
      location_name: 'Denpasar',
      location_description: 'Kantor cabang Denpasar untuk wilayah Bali dan Nusa Tenggara',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
      updated_by: 'admin',
      is_delete: false
    },
    {
      location_id: knex.raw('uuid_generate_v4()'),
      location_code: 'PLM01',
      location_name: 'Palembang',
      location_description: 'Gudang regional Palembang untuk Sumatera Selatan',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
      updated_by: 'admin',
      is_delete: false
    },
    {
      location_id: knex.raw('uuid_generate_v4()'),
      location_code: 'SMG01',
      location_name: 'Semarang',
      location_description: 'Pusat distribusi Semarang untuk Jawa Tengah',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
      updated_by: 'admin',
      is_delete: false
    },
    {
      location_id: knex.raw('uuid_generate_v4()'),
      location_code: 'BPN01',
      location_name: 'Balikpapan',
      location_description: 'Kantor cabang Balikpapan untuk wilayah Kalimantan',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
      updated_by: 'admin',
      is_delete: false
    },
    {
      location_id: knex.raw('uuid_generate_v4()'),
      location_code: 'PKU01',
      location_name: 'Pekanbaru',
      location_description: 'Gudang distribusi Pekanbaru untuk Riau dan sekitarnya',
      created_at: knex.fn.now(),
      created_by: 'admin',
      updated_at: knex.fn.now(),
      updated_by: 'admin',
      is_delete: false
    }
  ]);
};
