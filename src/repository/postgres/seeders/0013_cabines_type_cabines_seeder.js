/**
 * Seeder: Cabines Type Cabines data
 * Seed data untuk tabel relasi cabines_type_cabines
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('cabines_type_cabines').del();
  
  // Get IDs from related tables
  const cabines = await knex('cabines').select('cabines_id').limit(10);
  const typeCabines = await knex('type_cabines').select('type_cabine_id').limit(10);
  
  // Create relations (many-to-many)
  const relations = [];
  
  // CB-2000 Standard -> Standard Cab
  if (cabines[0] && typeCabines[0]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      cabines_id: cabines[0].cabines_id,
      type_cabine_id: typeCabines[0].type_cabine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // CB-3000 Comfort -> Extended Cab
  if (cabines[1] && typeCabines[1]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      cabines_id: cabines[1].cabines_id,
      type_cabine_id: typeCabines[1].type_cabine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // CB-4000 Premium -> Crew Cab
  if (cabines[2] && typeCabines[2]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      cabines_id: cabines[2].cabines_id,
      type_cabine_id: typeCabines[2].type_cabine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // CB-5000 Sleeper -> Sleeper Cab
  if (cabines[3] && typeCabines[3]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      cabines_id: cabines[3].cabines_id,
      type_cabine_id: typeCabines[3].type_cabine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // CB-6000 Extended -> Extended Cab
  if (cabines[4] && typeCabines[1]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      cabines_id: cabines[4].cabines_id,
      type_cabine_id: typeCabines[1].type_cabine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // CB-7000 Crew -> Crew Cab
  if (cabines[5] && typeCabines[2]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      cabines_id: cabines[5].cabines_id,
      type_cabine_id: typeCabines[2].type_cabine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // CB-8000 Heavy Duty -> Day Cab
  if (cabines[6] && typeCabines[4]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      cabines_id: cabines[6].cabines_id,
      type_cabine_id: typeCabines[4].type_cabine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // CB-9000 Tilt -> Tilt Cab
  if (cabines[7] && typeCabines[9]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      cabines_id: cabines[7].cabines_id,
      type_cabine_id: typeCabines[9].type_cabine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // CB-10000 Aero -> Low Roof Cab
  if (cabines[8] && typeCabines[5]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      cabines_id: cabines[8].cabines_id,
      type_cabine_id: typeCabines[5].type_cabine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // CB-11000 Electric -> High Roof Cab
  if (cabines[9] && typeCabines[6]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      cabines_id: cabines[9].cabines_id,
      type_cabine_id: typeCabines[6].type_cabine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // Insert relations
  if (relations.length > 0) {
    await knex('cabines_type_cabines').insert(relations);
  }
};

