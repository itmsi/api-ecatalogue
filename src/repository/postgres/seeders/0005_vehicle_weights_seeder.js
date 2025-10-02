/**
 * Seeder: Vehicle Weights data
 * Seed data untuk tabel vehicle_weights
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('vehicle_weights').del();
  
  // Insert seed data
  await knex('vehicle_weights').insert([
    {
      vehicle_weight_id: knex.raw('uuid_generate_v4()'),
      vehicle_weight_code: 'LW',
      vehicle_weight_name: 'Light Weight',
      vehicle_weight_description: 'Kendaraan dengan bobot ringan kurang dari 1000kg',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      vehicle_weight_id: knex.raw('uuid_generate_v4()'),
      vehicle_weight_code: 'MW',
      vehicle_weight_name: 'Medium Weight',
      vehicle_weight_description: 'Kendaraan dengan bobot sedang 1000-2500kg',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      vehicle_weight_id: knex.raw('uuid_generate_v4()'),
      vehicle_weight_code: 'HW',
      vehicle_weight_name: 'Heavy Weight',
      vehicle_weight_description: 'Kendaraan dengan bobot berat 2500-5000kg',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      vehicle_weight_id: knex.raw('uuid_generate_v4()'),
      vehicle_weight_code: 'EW',
      vehicle_weight_name: 'Extra Heavy Weight',
      vehicle_weight_description: 'Kendaraan dengan bobot ekstra berat di atas 5000kg',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      vehicle_weight_id: knex.raw('uuid_generate_v4()'),
      vehicle_weight_code: 'ULW',
      vehicle_weight_name: 'Ultra Light Weight',
      vehicle_weight_description: 'Kendaraan dengan bobot super ringan kurang dari 500kg',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};
