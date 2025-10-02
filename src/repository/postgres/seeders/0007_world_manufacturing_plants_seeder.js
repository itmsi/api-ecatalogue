/**
 * Seeder: World Manufacturing Plants data
 * Seed data untuk tabel world_manufacturing_plants
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('world_manufacturing_plants').del();
  
  // Insert seed data
  await knex('world_manufacturing_plants').insert([
    {
      world_manufacturing_plant_id: knex.raw('uuid_generate_v4()'),
      world_manufacturing_plant_code: 'TOKYO01',
      world_manufacturing_plant_name: 'Tokyo Main Plant',
      world_manufacturing_plant_description: 'Pabrik utama di Tokyo untuk produksi motor dan transmisi',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      world_manufacturing_plant_id: knex.raw('uuid_generate_v4()'),
      world_manufacturing_plant_code: 'OSAKA02',
      world_manufacturing_plant_name: 'Osaka Heavy Plant',
      world_manufacturing_plant_description: 'Pabrik khusus kendaraan berat di Osaka',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      world_manufacturing_plant_id: knex.raw('uuid_generate_v4()'),
      world_manufacturing_plant_code: 'NAGOYA03',
      world_manufacturing_plant_name: 'Nagoya Engine Plant',
      world_manufacturing_plant_description: 'Pabrik khusus mesin diesel dan komponen engine',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      world_manufacturing_plant_id: knex.raw('uuid_generate_v4()'),
      world_manufacturing_plant_code: 'SEUL04',
      world_manufacturing_plant_name: 'Seoul International Plant',
      world_manufacturing_plant_description: 'Pabrik internasional di Seoul untuk pasar global',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      world_manufacturing_plant_id: knex.raw('uuid_generate_v4()'),
      world_manufacturing_plant_code: 'SHANGHAI05',
      world_manufacturing_plant_name: 'Shanghai Manufacturing Hub',
      world_manufacturing_plant_description: 'Hub manufaktur di Shanghai untuk pasar Asia Pasifik',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};
