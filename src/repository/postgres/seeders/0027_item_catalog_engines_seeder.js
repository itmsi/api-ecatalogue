/**
 * Seeder: Item Catalog Engines data
 * Seed data untuk tabel item_catalog_engines
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('item_catalog_engines').del();
  
  // Get reference IDs
  const masterPdf = await knex('master_pdf').where('name_pdf', 'Engine Catalog 2024').first();
  const engines = await knex('engines').limit(2);
  const typeEngines = await knex('type_engines').limit(2);
  
  // Insert seed data only if references exist
  if (masterPdf && engines.length > 0 && typeEngines.length > 0) {
    await knex('item_catalog_engines').insert([
      {
        item_catalog_engine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        engine_id: engines[0].engines_id,
        type_engine_id: typeEngines[0].type_engine_id,
        target_id: 'ENG-001',
        diagram_serial_number: 'DSN-ENG-001',
        part_number: 'PN-ENG-12345',
        catalog_item_name_en: 'Engine Cylinder Block',
        catalog_item_name_ch: '发动机缸体',
        description: 'Main engine cylinder block assembly',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_engine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        engine_id: engines[0].engines_id,
        type_engine_id: typeEngines[0].type_engine_id,
        target_id: 'ENG-002',
        diagram_serial_number: 'DSN-ENG-002',
        part_number: 'PN-ENG-12346',
        catalog_item_name_en: 'Piston Assembly',
        catalog_item_name_ch: '活塞总成',
        description: 'Complete piston assembly with rings',
        quantity: 6,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_engine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        engine_id: engines[0].engines_id,
        type_engine_id: typeEngines[0].type_engine_id,
        target_id: 'ENG-003',
        diagram_serial_number: 'DSN-ENG-003',
        part_number: 'PN-ENG-12347',
        catalog_item_name_en: 'Crankshaft',
        catalog_item_name_ch: '曲轴',
        description: 'Forged steel crankshaft',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_engine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        engine_id: engines[0].engines_id,
        type_engine_id: typeEngines[0].type_engine_id,
        target_id: 'ENG-004',
        diagram_serial_number: 'DSN-ENG-004',
        part_number: 'PN-ENG-12348',
        catalog_item_name_en: 'Connecting Rod',
        catalog_item_name_ch: '连杆',
        description: 'Heavy duty connecting rod',
        quantity: 6,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_engine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        engine_id: engines[0].engines_id,
        type_engine_id: typeEngines[0].type_engine_id,
        target_id: 'ENG-005',
        diagram_serial_number: 'DSN-ENG-005',
        part_number: 'PN-ENG-12349',
        catalog_item_name_en: 'Cylinder Head',
        catalog_item_name_ch: '缸盖',
        description: 'Aluminum cylinder head assembly',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_engine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        engine_id: engines[0].engines_id,
        type_engine_id: typeEngines[1].type_engine_id,
        target_id: 'ENG-006',
        diagram_serial_number: 'DSN-ENG-006',
        part_number: 'PN-ENG-12350',
        catalog_item_name_en: 'Camshaft',
        catalog_item_name_ch: '凸轮轴',
        description: 'Engine camshaft assembly',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_engine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        engine_id: engines[0].engines_id,
        type_engine_id: typeEngines[1].type_engine_id,
        target_id: 'ENG-007',
        diagram_serial_number: 'DSN-ENG-007',
        part_number: 'PN-ENG-12351',
        catalog_item_name_en: 'Timing Belt',
        catalog_item_name_ch: '正时皮带',
        description: 'Reinforced timing belt',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_engine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        engine_id: engines[1]?.engines_id || engines[0].engines_id,
        type_engine_id: typeEngines[1].type_engine_id,
        target_id: 'ENG-008',
        diagram_serial_number: 'DSN-ENG-008',
        part_number: 'PN-ENG-12352',
        catalog_item_name_en: 'Oil Pump',
        catalog_item_name_ch: '机油泵',
        description: 'High pressure oil pump',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_engine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        engine_id: engines[1]?.engines_id || engines[0].engines_id,
        type_engine_id: typeEngines[1].type_engine_id,
        target_id: 'ENG-009',
        diagram_serial_number: 'DSN-ENG-009',
        part_number: 'PN-ENG-12353',
        catalog_item_name_en: 'Water Pump',
        catalog_item_name_ch: '水泵',
        description: 'Engine cooling water pump',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_engine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        engine_id: engines[1]?.engines_id || engines[0].engines_id,
        type_engine_id: typeEngines[0].type_engine_id,
        target_id: 'ENG-010',
        diagram_serial_number: 'DSN-ENG-010',
        part_number: 'PN-ENG-12354',
        catalog_item_name_en: 'Fuel Injection Pump',
        catalog_item_name_ch: '燃油喷射泵',
        description: 'High precision fuel injection pump',
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

