/**
 * Seeder: Item Catalog Steerings data
 * Seed data untuk tabel item_catalog_steerings
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('item_catalog_steerings').del();
  
  // Get reference IDs
  const masterPdf = await knex('master_pdf').where('name_pdf', 'Steering Catalog 2024').first();
  const steerings = await knex('steerings').limit(2);
  const typeSteerings = await knex('type_steerings').limit(2);
  
  // Insert seed data only if references exist
  if (masterPdf && steerings.length > 0 && typeSteerings.length > 0) {
    await knex('item_catalog_steerings').insert([
      {
        item_catalog_steering_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        steering_id: steerings[0].steering_id,
        type_steering_id: typeSteerings[0].type_steering_id,
        target_id: 'STR-001',
        diagram_serial_number: 'DSN-STR-001',
        part_number: 'PN-STR-40001',
        catalog_item_name_en: 'Steering Gearbox',
        catalog_item_name_ch: '转向器',
        description: 'Power steering gearbox assembly',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_steering_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        steering_id: steerings[0].steering_id,
        type_steering_id: typeSteerings[0].type_steering_id,
        target_id: 'STR-002',
        diagram_serial_number: 'DSN-STR-002',
        part_number: 'PN-STR-40002',
        catalog_item_name_en: 'Steering Column',
        catalog_item_name_ch: '转向柱',
        description: 'Steering column with universal joint',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_steering_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        steering_id: steerings[0].steering_id,
        type_steering_id: typeSteerings[0].type_steering_id,
        target_id: 'STR-003',
        diagram_serial_number: 'DSN-STR-003',
        part_number: 'PN-STR-40003',
        catalog_item_name_en: 'Steering Wheel',
        catalog_item_name_ch: '方向盘',
        description: 'Polyurethane steering wheel',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_steering_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        steering_id: steerings[0].steering_id,
        type_steering_id: typeSteerings[0].type_steering_id,
        target_id: 'STR-004',
        diagram_serial_number: 'DSN-STR-004',
        part_number: 'PN-STR-40004',
        catalog_item_name_en: 'Power Steering Pump',
        catalog_item_name_ch: '助力泵',
        description: 'Hydraulic power steering pump',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_steering_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        steering_id: steerings[0].steering_id,
        type_steering_id: typeSteerings[0].type_steering_id,
        target_id: 'STR-005',
        diagram_serial_number: 'DSN-STR-005',
        part_number: 'PN-STR-40005',
        catalog_item_name_en: 'Tie Rod End',
        catalog_item_name_ch: '横拉杆端',
        description: 'Heavy duty tie rod end',
        quantity: 2,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_steering_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        steering_id: steerings[0].steering_id,
        type_steering_id: typeSteerings[1].type_steering_id,
        target_id: 'STR-006',
        diagram_serial_number: 'DSN-STR-006',
        part_number: 'PN-STR-40006',
        catalog_item_name_en: 'Drag Link',
        catalog_item_name_ch: '直拉杆',
        description: 'Steering drag link assembly',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_steering_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        steering_id: steerings[0].steering_id,
        type_steering_id: typeSteerings[1].type_steering_id,
        target_id: 'STR-007',
        diagram_serial_number: 'DSN-STR-007',
        part_number: 'PN-STR-40007',
        catalog_item_name_en: 'Pitman Arm',
        catalog_item_name_ch: '转向摇臂',
        description: 'Forged pitman arm',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_steering_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        steering_id: steerings[1]?.steering_id || steerings[0].steering_id,
        type_steering_id: typeSteerings[1].type_steering_id,
        target_id: 'STR-008',
        diagram_serial_number: 'DSN-STR-008',
        part_number: 'PN-STR-40008',
        catalog_item_name_en: 'Steering Knuckle',
        catalog_item_name_ch: '转向节',
        description: 'Front axle steering knuckle',
        quantity: 2,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_steering_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        steering_id: steerings[1]?.steering_id || steerings[0].steering_id,
        type_steering_id: typeSteerings[1].type_steering_id,
        target_id: 'STR-009',
        diagram_serial_number: 'DSN-STR-009',
        part_number: 'PN-STR-40009',
        catalog_item_name_en: 'King Pin Set',
        catalog_item_name_ch: '主销套件',
        description: 'Steering king pin set with bushings',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_steering_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        steering_id: steerings[1]?.steering_id || steerings[0].steering_id,
        type_steering_id: typeSteerings[0].type_steering_id,
        target_id: 'STR-010',
        diagram_serial_number: 'DSN-STR-010',
        part_number: 'PN-STR-40010',
        catalog_item_name_en: 'Power Steering Hose Kit',
        catalog_item_name_ch: '助力转向油管套件',
        description: 'High pressure power steering hose kit',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      }
    ]);
  }
};

