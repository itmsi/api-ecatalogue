/**
 * Seeder: Steerings Type Steerings data
 * Seed data untuk tabel relasi steerings_type_steerings
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('steerings_type_steerings').del();
  
  // Get IDs from related tables
  const steerings = await knex('steerings').select('steering_id').limit(10);
  const typeSteerings = await knex('type_steerings').select('type_steering_id').limit(10);
  
  // Create relations (many-to-many)
  const relations = [];
  
  // ST-1000 Basic Manual -> Manual Steering
  if (steerings[0] && typeSteerings[0]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      steering_id: steerings[0].steering_id,
      type_steering_id: typeSteerings[0].type_steering_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ST-2000 Hydraulic Plus -> Hydraulic Power Steering
  if (steerings[1] && typeSteerings[1]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      steering_id: steerings[1].steering_id,
      type_steering_id: typeSteerings[1].type_steering_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ST-3000 EPS Eco -> Electric Power Steering
  if (steerings[2] && typeSteerings[2]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      steering_id: steerings[2].steering_id,
      type_steering_id: typeSteerings[2].type_steering_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ST-4000 EHPS Hybrid -> Electro-Hydraulic Steering
  if (steerings[3] && typeSteerings[3]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      steering_id: steerings[3].steering_id,
      type_steering_id: typeSteerings[3].type_steering_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ST-5000 Rack Pro -> Rack and Pinion Steering
  if (steerings[4] && typeSteerings[4]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      steering_id: steerings[4].steering_id,
      type_steering_id: typeSteerings[4].type_steering_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ST-6000 Ball Heavy -> Recirculating Ball Steering
  if (steerings[5] && typeSteerings[5]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      steering_id: steerings[5].steering_id,
      type_steering_id: typeSteerings[5].type_steering_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ST-7000 SBW Advanced -> Steer-by-Wire
  if (steerings[6] && typeSteerings[6]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      steering_id: steerings[6].steering_id,
      type_steering_id: typeSteerings[6].type_steering_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ST-8000 4WS Agile -> Four-Wheel Steering
  if (steerings[7] && typeSteerings[7]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      steering_id: steerings[7].steering_id,
      type_steering_id: typeSteerings[7].type_steering_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ST-9000 Active Smart -> Active Steering
  if (steerings[8] && typeSteerings[8]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      steering_id: steerings[8].steering_id,
      type_steering_id: typeSteerings[8].type_steering_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // ST-10000 Comfort Adjust -> Tilt and Telescopic Steering
  if (steerings[9] && typeSteerings[9]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      steering_id: steerings[9].steering_id,
      type_steering_id: typeSteerings[9].type_steering_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // Insert relations
  if (relations.length > 0) {
    await knex('steerings_type_steerings').insert(relations);
  }
};

