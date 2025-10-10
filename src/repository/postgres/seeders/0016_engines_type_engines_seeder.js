/**
 * Seeder: Engines Type Engines data
 * Seed data untuk tabel relasi engines_type_engines
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('engines_type_engines').del();
  
  // Get IDs from related tables
  const engines = await knex('engines').select('engines_id').limit(10);
  const typeEngines = await knex('type_engines').select('type_engine_id').limit(10);
  
  // Create relations (many-to-many)
  const relations = [];
  
  // ENG-4D20 Turbo Diesel -> Inline 4-Cylinder
  if (engines[0] && typeEngines[0]) {
    relations.push({
      engines_type_engines_id: knex.raw('uuid_generate_v4()'),
      engines_id: engines[0].engines_id,
      type_engine_id: typeEngines[0].type_engine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ENG-6L30 Heavy Duty -> Inline 6-Cylinder
  if (engines[1] && typeEngines[1]) {
    relations.push({
      engines_type_engines_id: knex.raw('uuid_generate_v4()'),
      engines_id: engines[1].engines_id,
      type_engine_id: typeEngines[1].type_engine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ENG-V6-35 Performance -> V6 Engine
  if (engines[2] && typeEngines[2]) {
    relations.push({
      engines_type_engines_id: knex.raw('uuid_generate_v4()'),
      engines_id: engines[2].engines_id,
      type_engine_id: typeEngines[2].type_engine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ENG-V8-50 Power -> V8 Engine
  if (engines[3] && typeEngines[3]) {
    relations.push({
      engines_type_engines_id: knex.raw('uuid_generate_v4()'),
      engines_id: engines[3].engines_id,
      type_engine_id: typeEngines[3].type_engine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ENG-V12-60 Luxury -> V12 Engine
  if (engines[4] && typeEngines[4]) {
    relations.push({
      engines_type_engines_id: knex.raw('uuid_generate_v4()'),
      engines_id: engines[4].engines_id,
      type_engine_id: typeEngines[4].type_engine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ENG-TD-40 Turbo -> Turbocharged Diesel
  if (engines[5] && typeEngines[5]) {
    relations.push({
      engines_type_engines_id: knex.raw('uuid_generate_v4()'),
      engines_id: engines[5].engines_id,
      type_engine_id: typeEngines[5].type_engine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ENG-HYB-25 Hybrid -> Hybrid Electric
  if (engines[6] && typeEngines[6]) {
    relations.push({
      engines_type_engines_id: knex.raw('uuid_generate_v4()'),
      engines_id: engines[6].engines_id,
      type_engine_id: typeEngines[6].type_engine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ENG-ELEC-200 Electric -> Full Electric
  if (engines[7] && typeEngines[7]) {
    relations.push({
      engines_type_engines_id: knex.raw('uuid_generate_v4()'),
      engines_id: engines[7].engines_id,
      type_engine_id: typeEngines[7].type_engine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ENG-H2-150 Fuel Cell -> Hydrogen Fuel Cell
  if (engines[8] && typeEngines[8]) {
    relations.push({
      engines_type_engines_id: knex.raw('uuid_generate_v4()'),
      engines_id: engines[8].engines_id,
      type_engine_id: typeEngines[8].type_engine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ENG-CNG-30 Natural Gas -> Natural Gas CNG
  if (engines[9] && typeEngines[9]) {
    relations.push({
      engines_type_engines_id: knex.raw('uuid_generate_v4()'),
      engines_id: engines[9].engines_id,
      type_engine_id: typeEngines[9].type_engine_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // Insert relations
  if (relations.length > 0) {
    await knex('engines_type_engines').insert(relations);
  }
};

