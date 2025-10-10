/**
 * Seeder: Transmissions Type Transmissions data
 * Seed data untuk tabel relasi transmissions_type_transmissions
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('transmissions_type_transmissions').del();
  
  // Get IDs from related tables
  const transmissions = await knex('transmissions').select('transmission_id').limit(10);
  const typeTransmissions = await knex('type_transmissions').select('type_transmission_id').limit(10);
  
  // Create relations (many-to-many)
  const relations = [];
  
  // TRX-5MT Standard -> Manual Transmission
  if (transmissions[0] && typeTransmissions[0]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      transmission_id: transmissions[0].transmission_id,
      type_transmission_id: typeTransmissions[0].type_transmission_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // TRX-6MT Heavy -> Manual Transmission
  if (transmissions[1] && typeTransmissions[0]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      transmission_id: transmissions[1].transmission_id,
      type_transmission_id: typeTransmissions[0].type_transmission_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // TRX-8AT Premium -> Automatic Transmission
  if (transmissions[2] && typeTransmissions[1]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      transmission_id: transmissions[2].transmission_id,
      type_transmission_id: typeTransmissions[1].type_transmission_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // TRX-10AT Elite -> Automatic Transmission
  if (transmissions[3] && typeTransmissions[1]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      transmission_id: transmissions[3].transmission_id,
      type_transmission_id: typeTransmissions[1].type_transmission_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // TRX-CVT Eco -> CVT Transmission
  if (transmissions[4] && typeTransmissions[3]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      transmission_id: transmissions[4].transmission_id,
      type_transmission_id: typeTransmissions[3].type_transmission_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // TRX-7DCT Sport -> DCT Transmission
  if (transmissions[5] && typeTransmissions[4]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      transmission_id: transmissions[5].transmission_id,
      type_transmission_id: typeTransmissions[4].type_transmission_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // TRX-6AMT Commercial -> AMT Transmission
  if (transmissions[6] && typeTransmissions[5]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      transmission_id: transmissions[6].transmission_id,
      type_transmission_id: typeTransmissions[5].type_transmission_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // TRX-Allison-3000 -> Allison Automatic
  if (transmissions[7] && typeTransmissions[7]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      transmission_id: transmissions[7].transmission_id,
      type_transmission_id: typeTransmissions[7].type_transmission_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // TRX-ZF-8HP Luxury -> ZF Transmission
  if (transmissions[8] && typeTransmissions[8]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      transmission_id: transmissions[8].transmission_id,
      type_transmission_id: typeTransmissions[8].type_transmission_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // TRX-EV-SS Electric -> Electric Single Speed
  if (transmissions[9] && typeTransmissions[9]) {
    relations.push({
      id: knex.raw('uuid_generate_v4()'),
      transmission_id: transmissions[9].transmission_id,
      type_transmission_id: typeTransmissions[9].type_transmission_id,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  // Insert relations
  if (relations.length > 0) {
    await knex('transmissions_type_transmissions').insert(relations);
  }
};

