/**
 * Seeder: Item Catalog Axles data
 * Seed data untuk tabel item_catalog_axles
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('item_catalog_axles').del();
  
  // Get reference IDs
  const masterPdf = await knex('master_pdf').where('name_pdf', 'Axle Catalog 2024').first();
  const axels = await knex('axels').limit(2);
  const typeAxels = await knex('type_axels').limit(2);
  
  // Insert seed data only if references exist
  if (masterPdf && axels.length > 0 && typeAxels.length > 0) {
    await knex('item_catalog_axles').insert([
      {
        item_catalog_axle_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        axel_id: axels[0].axel_id,
        type_axel_id: typeAxels[0].type_axel_id,
        target_id: 'AXL-001',
        diagram_serial_number: 'DSN-AXL-001',
        part_number: 'PN-AXL-30001',
        catalog_item_name_en: 'Axle Housing Assembly',
        catalog_item_name_ch: '桥壳总成',
        description: 'Complete axle housing assembly',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_axle_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        axel_id: axels[0].axel_id,
        type_axel_id: typeAxels[0].type_axel_id,
        target_id: 'AXL-002',
        diagram_serial_number: 'DSN-AXL-002',
        part_number: 'PN-AXL-30002',
        catalog_item_name_en: 'Differential Assembly',
        catalog_item_name_ch: '差速器总成',
        description: 'Heavy duty differential assembly',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_axle_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        axel_id: axels[0].axel_id,
        type_axel_id: typeAxels[0].type_axel_id,
        target_id: 'AXL-003',
        diagram_serial_number: 'DSN-AXL-003',
        part_number: 'PN-AXL-30003',
        catalog_item_name_en: 'Crown Wheel and Pinion',
        catalog_item_name_ch: '主减速器齿轮组',
        description: 'Final drive crown wheel and pinion set',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_axle_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        axel_id: axels[0].axel_id,
        type_axel_id: typeAxels[0].type_axel_id,
        target_id: 'AXL-004',
        diagram_serial_number: 'DSN-AXL-004',
        part_number: 'PN-AXL-30004',
        catalog_item_name_en: 'Axle Shaft',
        catalog_item_name_ch: '半轴',
        description: 'Heavy duty axle shaft',
        quantity: 2,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_axle_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        axel_id: axels[0].axel_id,
        type_axel_id: typeAxels[0].type_axel_id,
        target_id: 'AXL-005',
        diagram_serial_number: 'DSN-AXL-005',
        part_number: 'PN-AXL-30005',
        catalog_item_name_en: 'Wheel Hub Assembly',
        catalog_item_name_ch: '轮毂总成',
        description: 'Complete wheel hub assembly with bearings',
        quantity: 2,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_axle_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        axel_id: axels[0].axel_id,
        type_axel_id: typeAxels[1].type_axel_id,
        target_id: 'AXL-006',
        diagram_serial_number: 'DSN-AXL-006',
        part_number: 'PN-AXL-30006',
        catalog_item_name_en: 'Brake Drum',
        catalog_item_name_ch: '制动鼓',
        description: 'Cast iron brake drum',
        quantity: 2,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_axle_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        axel_id: axels[0].axel_id,
        type_axel_id: typeAxels[1].type_axel_id,
        target_id: 'AXL-007',
        diagram_serial_number: 'DSN-AXL-007',
        part_number: 'PN-AXL-30007',
        catalog_item_name_en: 'Brake Shoe Set',
        catalog_item_name_ch: '制动蹄片组',
        description: 'Brake shoe set with lining',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_axle_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        axel_id: axels[1]?.axel_id || axels[0].axel_id,
        type_axel_id: typeAxels[1].type_axel_id,
        target_id: 'AXL-008',
        diagram_serial_number: 'DSN-AXL-008',
        part_number: 'PN-AXL-30008',
        catalog_item_name_en: 'Bearing Kit',
        catalog_item_name_ch: '轴承套件',
        description: 'Complete axle bearing kit',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_axle_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        axel_id: axels[1]?.axel_id || axels[0].axel_id,
        type_axel_id: typeAxels[1].type_axel_id,
        target_id: 'AXL-009',
        diagram_serial_number: 'DSN-AXL-009',
        part_number: 'PN-AXL-30009',
        catalog_item_name_en: 'Oil Seal Kit',
        catalog_item_name_ch: '油封套件',
        description: 'Axle oil seal kit',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_axle_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        axel_id: axels[1]?.axel_id || axels[0].axel_id,
        type_axel_id: typeAxels[0].type_axel_id,
        target_id: 'AXL-010',
        diagram_serial_number: 'DSN-AXL-010',
        part_number: 'PN-AXL-30010',
        catalog_item_name_en: 'Axle Spacer Kit',
        catalog_item_name_ch: '桥垫片套件',
        description: 'Complete axle spacer and shim kit',
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

