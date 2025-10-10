/**
 * Seeder: Axels Type Axels data
 * Seed data untuk tabel relasi axels_type_axels
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('axels_type_axels').del();
  
  // Get IDs from related tables
  const axels = await knex('axels').select('axel_id').limit(10);
  const typeAxels = await knex('type_axels').select('type_axel_id').limit(10);
  
  // Create relations (many-to-many)
  const relations = [];
  
  // AX-1000 Light Duty -> Single Axle
  if (axels[0] && typeAxels[0]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      axel_id: axels[0].axel_id,
      type_axel_id: typeAxels[0].type_axel_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // AX-2000 Medium Duty -> Single Axle
  if (axels[1] && typeAxels[0]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      axel_id: axels[1].axel_id,
      type_axel_id: typeAxels[0].type_axel_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // AX-3000 Heavy Tandem -> Tandem Axle
  if (axels[2] && typeAxels[1]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      axel_id: axels[2].axel_id,
      type_axel_id: typeAxels[1].type_axel_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // AX-4000 Tri-Axle Heavy -> Tri-Axle
  if (axels[3] && typeAxels[2]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      axel_id: axels[3].axel_id,
      type_axel_id: typeAxels[2].type_axel_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // AX-5000 Drive Pro -> Drive Axle
  if (axels[4] && typeAxels[3]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      axel_id: axels[4].axel_id,
      type_axel_id: typeAxels[3].type_axel_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // AX-6000 Steer Master -> Steer Axle
  if (axels[5] && typeAxels[4]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      axel_id: axels[5].axel_id,
      type_axel_id: typeAxels[4].type_axel_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // AX-7000 Lift Smart -> Lift Axle
  if (axels[6] && typeAxels[5]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      axel_id: axels[6].axel_id,
      type_axel_id: typeAxels[5].type_axel_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // AX-8000 Tag Elite -> Tag Axle
  if (axels[7] && typeAxels[6]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      axel_id: axels[7].axel_id,
      type_axel_id: typeAxels[6].type_axel_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // AX-9000 Portal Extreme -> Portal Axle
  if (axels[8] && typeAxels[9]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      axel_id: axels[8].axel_id,
      type_axel_id: typeAxels[9].type_axel_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // AX-10000 Independent Comfort -> Independent Suspension Axle
  if (axels[9] && typeAxels[8]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      axel_id: axels[9].axel_id,
      type_axel_id: typeAxels[8].type_axel_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // Insert relations
  if (relations.length > 0) {
    await knex('axels_type_axels').insert(relations);
  }
};

