/**
 * Seeder: Item Catalog Transmissions data
 * Seed data untuk tabel item_catalog_transmissions
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('item_catalog_transmissions').del();
  
  // Get reference IDs
  const masterPdf = await knex('master_pdf').where('name_pdf', 'Transmission Catalog 2024').first();
  const transmissions = await knex('transmissions').limit(2);
  const typeTransmissions = await knex('type_transmissions').limit(2);
  
  // Insert seed data only if references exist
  if (masterPdf && transmissions.length > 0 && typeTransmissions.length > 0) {
    await knex('item_catalog_transmissions').insert([
      {
        item_catalog_transmission_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        transmission_id: transmissions[0].transmission_id,
        type_transmission_id: typeTransmissions[0].type_transmission_id,
        target_id: 'TRS-001',
        diagram_serial_number: 'DSN-TRS-001',
        part_number: 'PN-TRS-20001',
        catalog_item_name_en: 'Transmission Gearbox Housing',
        catalog_item_name_ch: '变速箱壳体',
        description: 'Main transmission gearbox housing assembly',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_transmission_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        transmission_id: transmissions[0].transmission_id,
        type_transmission_id: typeTransmissions[0].type_transmission_id,
        target_id: 'TRS-002',
        diagram_serial_number: 'DSN-TRS-002',
        part_number: 'PN-TRS-20002',
        catalog_item_name_en: 'Clutch Assembly',
        catalog_item_name_ch: '离合器总成',
        description: 'Heavy duty clutch assembly',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_transmission_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        transmission_id: transmissions[0].transmission_id,
        type_transmission_id: typeTransmissions[0].type_transmission_id,
        target_id: 'TRS-003',
        diagram_serial_number: 'DSN-TRS-003',
        part_number: 'PN-TRS-20003',
        catalog_item_name_en: 'Synchronizer Ring',
        catalog_item_name_ch: '同步环',
        description: 'Brass synchronizer ring',
        quantity: 6,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_transmission_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        transmission_id: transmissions[0].transmission_id,
        type_transmission_id: typeTransmissions[0].type_transmission_id,
        target_id: 'TRS-004',
        diagram_serial_number: 'DSN-TRS-004',
        part_number: 'PN-TRS-20004',
        catalog_item_name_en: 'Input Shaft',
        catalog_item_name_ch: '输入轴',
        description: 'Transmission input shaft',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_transmission_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        transmission_id: transmissions[0].transmission_id,
        type_transmission_id: typeTransmissions[0].type_transmission_id,
        target_id: 'TRS-005',
        diagram_serial_number: 'DSN-TRS-005',
        part_number: 'PN-TRS-20005',
        catalog_item_name_en: 'Output Shaft',
        catalog_item_name_ch: '输出轴',
        description: 'Transmission output shaft',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_transmission_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        transmission_id: transmissions[0].transmission_id,
        type_transmission_id: typeTransmissions[1].type_transmission_id,
        target_id: 'TRS-006',
        diagram_serial_number: 'DSN-TRS-006',
        part_number: 'PN-TRS-20006',
        catalog_item_name_en: 'Gear Set 1st-2nd',
        catalog_item_name_ch: '1-2档齿轮组',
        description: '1st and 2nd gear set',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_transmission_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        transmission_id: transmissions[0].transmission_id,
        type_transmission_id: typeTransmissions[1].type_transmission_id,
        target_id: 'TRS-007',
        diagram_serial_number: 'DSN-TRS-007',
        part_number: 'PN-TRS-20007',
        catalog_item_name_en: 'Gear Set 3rd-4th',
        catalog_item_name_ch: '3-4档齿轮组',
        description: '3rd and 4th gear set',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_transmission_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        transmission_id: transmissions[1]?.transmission_id || transmissions[0].transmission_id,
        type_transmission_id: typeTransmissions[1].type_transmission_id,
        target_id: 'TRS-008',
        diagram_serial_number: 'DSN-TRS-008',
        part_number: 'PN-TRS-20008',
        catalog_item_name_en: 'Shift Fork Assembly',
        catalog_item_name_ch: '换挡拨叉总成',
        description: 'Complete shift fork assembly',
        quantity: 3,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_transmission_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        transmission_id: transmissions[1]?.transmission_id || transmissions[0].transmission_id,
        type_transmission_id: typeTransmissions[1].type_transmission_id,
        target_id: 'TRS-009',
        diagram_serial_number: 'DSN-TRS-009',
        part_number: 'PN-TRS-20009',
        catalog_item_name_en: 'Transmission Oil Pump',
        catalog_item_name_ch: '变速箱油泵',
        description: 'Automatic transmission oil pump',
        quantity: 1,
        file_foto: null,
        created_at: knex.fn.now(),
        created_by: knex.raw('uuid_generate_v4()'),
        updated_at: knex.fn.now(),
        updated_by: knex.raw('uuid_generate_v4()'),
        is_delete: false
      },
      {
        item_catalog_transmission_id: knex.raw('uuid_generate_v4()'),
        master_pdf_id: masterPdf.master_pdf_id,
        transmission_id: transmissions[1]?.transmission_id || transmissions[0].transmission_id,
        type_transmission_id: typeTransmissions[0].type_transmission_id,
        target_id: 'TRS-010',
        diagram_serial_number: 'DSN-TRS-010',
        part_number: 'PN-TRS-20010',
        catalog_item_name_en: 'Torque Converter',
        catalog_item_name_ch: '液力变矩器',
        description: 'High efficiency torque converter',
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

