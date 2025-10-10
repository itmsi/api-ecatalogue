/**
 * Seeder: Item Catalog Cabines data
 * Seed data untuk tabel item_catalog_cabines
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('item_catalog_cabines').del();
  
  // Get reference IDs
  const masterPdf = await knex('master_pdf').where('name_pdf', 'Cabine Catalog 2024').first();
  const cabines = await knex('cabines').limit(2);
  const typeCabines = await knex('type_cabines').limit(2);
  
  // Insert seed data only if references exist
  if (masterPdf && cabines.length > 0 && typeCabines.length > 0) {
    await knex('item_catalog_cabines').insert([
      {
        item_catalog_cabine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        cabine_id: cabines[0].cabine_id,
        type_cabine_id: typeCabines[0].type_cabine_id,
        target_id: 'CAB-001',
        diagram_serial_number: 'DSN-CAB-001',
        part_number: 'PN-CAB-50001',
        catalog_item_name_en: 'Cabin Shell Assembly',
        catalog_item_name_ch: '驾驶室壳体总成',
        description: 'Complete cabin shell assembly',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_cabine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        cabine_id: cabines[0].cabine_id,
        type_cabine_id: typeCabines[0].type_cabine_id,
        target_id: 'CAB-002',
        diagram_serial_number: 'DSN-CAB-002',
        part_number: 'PN-CAB-50002',
        catalog_item_name_en: 'Dashboard Assembly',
        catalog_item_name_ch: '仪表板总成',
        description: 'Complete dashboard with instruments',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_cabine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        cabine_id: cabines[0].cabine_id,
        type_cabine_id: typeCabines[0].type_cabine_id,
        target_id: 'CAB-003',
        diagram_serial_number: 'DSN-CAB-003',
        part_number: 'PN-CAB-50003',
        catalog_item_name_en: 'Driver Seat',
        catalog_item_name_ch: '驾驶员座椅',
        description: 'Adjustable driver seat with air suspension',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_cabine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        cabine_id: cabines[0].cabine_id,
        type_cabine_id: typeCabines[0].type_cabine_id,
        target_id: 'CAB-004',
        diagram_serial_number: 'DSN-CAB-004',
        part_number: 'PN-CAB-50004',
        catalog_item_name_en: 'Passenger Seat',
        catalog_item_name_ch: '副驾驶座椅',
        description: 'Passenger seat with adjustable backrest',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_cabine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        cabine_id: cabines[0].cabine_id,
        type_cabine_id: typeCabines[0].type_cabine_id,
        target_id: 'CAB-005',
        diagram_serial_number: 'DSN-CAB-005',
        part_number: 'PN-CAB-50005',
        catalog_item_name_en: 'Door Panel Left',
        catalog_item_name_ch: '左侧门板',
        description: 'Left side door panel with window mechanism',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_cabine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        cabine_id: cabines[0].cabine_id,
        type_cabine_id: typeCabines[1].type_cabine_id,
        target_id: 'CAB-006',
        diagram_serial_number: 'DSN-CAB-006',
        part_number: 'PN-CAB-50006',
        catalog_item_name_en: 'Door Panel Right',
        catalog_item_name_ch: '右侧门板',
        description: 'Right side door panel with window mechanism',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_cabine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        cabine_id: cabines[0].cabine_id,
        type_cabine_id: typeCabines[1].type_cabine_id,
        target_id: 'CAB-007',
        diagram_serial_number: 'DSN-CAB-007',
        part_number: 'PN-CAB-50007',
        catalog_item_name_en: 'Windshield Glass',
        catalog_item_name_ch: '前挡风玻璃',
        description: 'Laminated safety windshield glass',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_cabine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        cabine_id: cabines[1]?.cabine_id || cabines[0].cabine_id,
        type_cabine_id: typeCabines[1].type_cabine_id,
        target_id: 'CAB-008',
        diagram_serial_number: 'DSN-CAB-008',
        part_number: 'PN-CAB-50008',
        catalog_item_name_en: 'Interior Trim Panel Set',
        catalog_item_name_ch: '内饰板套件',
        description: 'Complete interior trim panel set',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_cabine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        cabine_id: cabines[1]?.cabine_id || cabines[0].cabine_id,
        type_cabine_id: typeCabines[1].type_cabine_id,
        target_id: 'CAB-009',
        diagram_serial_number: 'DSN-CAB-009',
        part_number: 'PN-CAB-50009',
        catalog_item_name_en: 'Air Conditioning Unit',
        catalog_item_name_ch: '空调机组',
        description: 'Cabin air conditioning unit',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_cabine_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        cabine_id: cabines[1]?.cabine_id || cabines[0].cabine_id,
        type_cabine_id: typeCabines[0].type_cabine_id,
        target_id: 'CAB-010',
        diagram_serial_number: 'DSN-CAB-010',
        part_number: 'PN-CAB-50010',
        catalog_item_name_en: 'Sunvisor Set',
        catalog_item_name_ch: '遮阳板套件',
        description: 'Driver and passenger sunvisor set',
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

