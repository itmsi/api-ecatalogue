const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'item_catalog_engines';
const MASTER_PDF_TABLE = 'master_pdf';

/**
 * Find or create master PDF
 */
const findOrCreateMasterPdf = async (namePdf, createdBy = null) => {
  // Cek apakah master_pdf sudah ada
  const existing = await db(MASTER_PDF_TABLE)
    .where({ name_pdf: namePdf, is_delete: false })
    .whereNull('deleted_at')
    .first();
  
  if (existing) {
    return existing.master_pdf_id;
  }
  
  // Jika belum ada, insert baru
  const [newMasterPdf] = await db(MASTER_PDF_TABLE)
    .insert({
      name_pdf: namePdf,
      created_at: db.fn.now(),
      created_by: createdBy,
      updated_at: db.fn.now(),
      updated_by: createdBy,
      is_delete: false
    })
    .returning('master_pdf_id');
  
  return newMasterPdf.master_pdf_id;
};

/**
 * Find all items with pagination and filter
 */
const findAll = async (filters) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    sort_by = 'created_at',
    sort_order = 'desc',
    master_pdf_id = null
  } = filters;
  
  const offset = (page - 1) * limit;
  
  let query = db(TABLE_NAME)
    .select(
      `${TABLE_NAME}.*`,
      'master_pdf.name_pdf',
      'engines.engines_name_en',
      'engines.engines_name_cn',
      'type_engines.type_engine_name_en',
      'type_engines.type_engine_name_cn'
    )
    .leftJoin('master_pdf', `${TABLE_NAME}.master_pdf_id`, 'master_pdf.master_pdf_id')
    .leftJoin('engines', `${TABLE_NAME}.engine_id`, 'engines.engines_id')
    .leftJoin('type_engines', `${TABLE_NAME}.type_engine_id`, 'type_engines.type_engine_id')
    .where({ [`${TABLE_NAME}.is_delete`]: false })
    .whereNull(`${TABLE_NAME}.deleted_at`);
  
  // Filter by master_pdf_id jika diberikan (skip jika string kosong)
  if (master_pdf_id && master_pdf_id !== '') {
    query = query.where({ [`${TABLE_NAME}.master_pdf_id`]: master_pdf_id });
  }
  
  // Search
  if (search) {
    query = query.where((builder) => {
      builder
        .where('master_pdf.name_pdf', 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.catalog_item_name_en`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.catalog_item_name_ch`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.part_number`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.target_id`, 'ilike', `%${search}%`);
    });
  }
  
  const data = await query
    .clone()
    .orderBy(`${TABLE_NAME}.${sort_by}`, sort_order)
    .limit(limit)
    .offset(offset);
  
  // Count total dengan query terpisah
  const countQuery = db(TABLE_NAME)
    .where({ [`${TABLE_NAME}.is_delete`]: false })
    .whereNull(`${TABLE_NAME}.deleted_at`);
  
  if (master_pdf_id && master_pdf_id !== '') {
    countQuery.where({ [`${TABLE_NAME}.master_pdf_id`]: master_pdf_id });
  }
  
  if (search) {
    countQuery.leftJoin('master_pdf', `${TABLE_NAME}.master_pdf_id`, 'master_pdf.master_pdf_id')
      .where((builder) => {
        builder
          .where('master_pdf.name_pdf', 'ilike', `%${search}%`)
          .orWhere(`${TABLE_NAME}.catalog_item_name_en`, 'ilike', `%${search}%`)
          .orWhere(`${TABLE_NAME}.catalog_item_name_ch`, 'ilike', `%${search}%`)
          .orWhere(`${TABLE_NAME}.part_number`, 'ilike', `%${search}%`)
          .orWhere(`${TABLE_NAME}.target_id`, 'ilike', `%${search}%`);
      });
  }
  
  const total = await countQuery.count('* as count').first();
  
  return {
    items: data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: parseInt(total.count),
      totalPages: Math.ceil(total.count / limit)
    }
  };
};

/**
 * Find single item by ID with relations
 */
const findById = async (id) => {
  const data = await db(TABLE_NAME)
    .select(
      `${TABLE_NAME}.*`,
      'master_pdf.name_pdf',
      'engines.engines_name_en',
      'engines.engines_name_cn',
      'type_engines.type_engine_name_en',
      'type_engines.type_engine_name_cn'
    )
    .leftJoin('master_pdf', `${TABLE_NAME}.master_pdf_id`, 'master_pdf.master_pdf_id')
    .leftJoin('engines', `${TABLE_NAME}.engine_id`, 'engines.engines_id')
    .leftJoin('type_engines', `${TABLE_NAME}.type_engine_id`, 'type_engines.type_engine_id')
    .where({ [`${TABLE_NAME}.item_catalog_engine_id`]: id, [`${TABLE_NAME}.is_delete`]: false })
    .whereNull(`${TABLE_NAME}.deleted_at`)
    .first();
  
  return data;
};

/**
 * Find all items by master_pdf_id
 */
const findByMasterPdfId = async (masterPdfId) => {
  const data = await db(TABLE_NAME)
    .select(
      `${TABLE_NAME}.*`,
      'engines.engines_name_en',
      'engines.engines_name_cn',
      'type_engines.type_engine_name_en',
      'type_engines.type_engine_name_cn'
    )
    .leftJoin('engines', `${TABLE_NAME}.engine_id`, 'engines.engines_id')
    .leftJoin('type_engines', `${TABLE_NAME}.type_engine_id`, 'type_engines.type_engine_id')
    .where({ [`${TABLE_NAME}.master_pdf_id`]: masterPdfId, [`${TABLE_NAME}.is_delete`]: false })
    .whereNull(`${TABLE_NAME}.deleted_at`)
    .orderBy(`${TABLE_NAME}.created_at`, 'desc');
  
  return data;
};

/**
 * Create new items (bulk insert)
 */
const create = async (namePdf, dataItems, userId) => {
  // Find or create master_pdf
  const masterPdfId = await findOrCreateMasterPdf(namePdf, userId);
  
  // Prepare bulk insert data
  const itemsToInsert = dataItems.map(item => ({
    master_pdf_id: masterPdfId,
    engine_id: item.engine_id || null,
    type_engine_id: item.type_engine_id || null,
    target_id: item.target_id || null,
    diagram_serial_number: item.diagram_serial_number || null,
    part_number: item.part_number || null,
    catalog_item_name_en: item.catalog_item_name_en || null,
    catalog_item_name_ch: item.catalog_item_name_ch || null,
    description: item.description || null,
    quantity: item.quantity || null,
    created_at: db.fn.now(),
    created_by: userId,
    updated_at: db.fn.now(),
    updated_by: userId,
    is_delete: false
  }));
  
  // Bulk insert
  const result = await db(TABLE_NAME)
    .insert(itemsToInsert)
    .returning('*');
  
  return {
    master_pdf_id: masterPdfId,
    items: result
  };
};

/**
 * Find or create master PDF dengan transaction
 */
const findOrCreateMasterPdfWithTransaction = async (trx, namePdf, createdBy = null, fileFotoUrl = null) => {
  // Cek apakah master_pdf sudah ada
  const existing = await trx(MASTER_PDF_TABLE)
    .where({ name_pdf: namePdf, is_delete: false })
    .whereNull('deleted_at')
    .first();
  
  if (existing) {
    // Update file_foto jika ada
    if (fileFotoUrl) {
      await trx(MASTER_PDF_TABLE)
        .where({ master_pdf_id: existing.master_pdf_id })
        .update({
          file_foto: fileFotoUrl,
          updated_at: trx.fn.now(),
          updated_by: createdBy
        });
    }
    return existing.master_pdf_id;
  }
  
  // Jika belum ada, insert baru
  const insertData = {
    name_pdf: namePdf,
    created_at: trx.fn.now(),
    created_by: createdBy,
    updated_at: trx.fn.now(),
    updated_by: createdBy,
    is_delete: false
  };
  
  if (fileFotoUrl) {
    insertData.file_foto = fileFotoUrl;
  }
  
  const [newMasterPdf] = await trx(MASTER_PDF_TABLE)
    .insert(insertData)
    .returning('master_pdf_id');
  
  return newMasterPdf.master_pdf_id;
};

/**
 * Create new items dengan transaction (bulk insert/update - UPSERT)
 * Jika kombinasi master_pdf_id + engine_id + type_engine_id + target_id sudah ada, maka UPDATE
 * Jika belum ada, maka INSERT
 */
const createWithTransaction = async (trx, namePdf, dataItems, userId, fileFotoUrl = null, engineId = null, typeEngineId = null) => {
  // Find or create master_pdf dengan transaction
  const masterPdfId = await findOrCreateMasterPdfWithTransaction(trx, namePdf, userId, fileFotoUrl);
  
  console.log('=== REPOSITORY CREATE: masterPdfId:', masterPdfId);
  console.log('=== REPOSITORY CREATE: engineId:', engineId);
  console.log('=== REPOSITORY CREATE: typeEngineId:', typeEngineId);
  console.log('=== REPOSITORY CREATE: dataItems count:', dataItems.length);
  
  const results = [];
  
  // Process each item - check if exists then update or insert
  for (const item of dataItems) {
    console.log('=== REPOSITORY CREATE: Processing item ===');
    console.log('Raw item from dataItems:', JSON.stringify(item, null, 2));
    
    const itemData = {
      master_pdf_id: masterPdfId,
      engine_id: engineId || null,
      type_engine_id: typeEngineId || null,
      target_id: item.target_id || null,
      diagram_serial_number: item.diagram_serial_number || null,
      part_number: item.part_number || null,
      catalog_item_name_en: item.catalog_item_name_en || null,
      catalog_item_name_ch: item.catalog_item_name_ch || null,
      description: item.description || null,
      quantity: item.quantity || null
    };
    
    console.log('ItemData to insert/update:', JSON.stringify(itemData, null, 2));
    
    // Check if item already exists based on unique combination
    const whereClause = {
      master_pdf_id: masterPdfId,
      is_delete: false
    };
    
    // Add conditions for engine_id, type_engine_id, target_id only if they are not null
    if (engineId) whereClause.engine_id = engineId;
    if (typeEngineId) whereClause.type_engine_id = typeEngineId;
    if (item.target_id) whereClause.target_id = item.target_id;
    
    const existing = await trx(TABLE_NAME)
      .where(whereClause)
      .whereNull('deleted_at')
      .first();
    
    if (existing) {
      // UPDATE existing item
      const [updated] = await trx(TABLE_NAME)
        .where({ item_catalog_engine_id: existing.item_catalog_engine_id })
        .update({
          ...itemData,
          updated_at: trx.fn.now(),
          updated_by: userId
        })
        .returning('*');
      
      results.push(updated);
    } else {
      // INSERT new item
      const [inserted] = await trx(TABLE_NAME)
        .insert({
          ...itemData,
          created_at: trx.fn.now(),
          created_by: userId,
          updated_at: trx.fn.now(),
          updated_by: userId,
          is_delete: false
        })
        .returning('*');
      
      results.push(inserted);
    }
  }
  
  return {
    master_pdf_id: masterPdfId,
    items: results
  };
};

/**
 * Update items by master_pdf_id
 * Strategy: Delete old items and insert new ones
 */
const update = async (id, namePdf, dataItems, userId) => {
  // Cek apakah item dengan id tersebut ada
  const existingItem = await db(TABLE_NAME)
    .where({ item_catalog_engine_id: id, is_delete: false })
    .whereNull('deleted_at')
    .first();
  
  if (!existingItem) {
    return null;
  }
  
  // Find or create master_pdf
  const masterPdfId = await findOrCreateMasterPdf(namePdf, userId);
  
  // Soft delete all items with this master_pdf_id
  await db(TABLE_NAME)
    .where({ master_pdf_id: existingItem.master_pdf_id })
    .update({
      is_delete: true,
      deleted_at: db.fn.now(),
      deleted_by: userId
    });
  
  // Insert new items
  const itemsToInsert = dataItems.map(item => ({
    master_pdf_id: masterPdfId,
    engine_id: item.engine_id || null,
    type_engine_id: item.type_engine_id || null,
    target_id: item.target_id || null,
    diagram_serial_number: item.diagram_serial_number || null,
    part_number: item.part_number || null,
    catalog_item_name_en: item.catalog_item_name_en || null,
    catalog_item_name_ch: item.catalog_item_name_ch || null,
    description: item.description || null,
    quantity: item.quantity || null,
    created_at: db.fn.now(),
    created_by: userId,
    updated_at: db.fn.now(),
    updated_by: userId,
    is_delete: false
  }));
  
  const result = await db(TABLE_NAME)
    .insert(itemsToInsert)
    .returning('*');
  
  return {
    master_pdf_id: masterPdfId,
    items: result
  };
};

/**
 * Update items by master_pdf_id dengan transaction (UPSERT)
 * Jika kombinasi master_pdf_id + engine_id + type_engine_id + target_id sudah ada, maka UPDATE
 * Jika belum ada, maka INSERT
 */
const updateWithTransaction = async (trx, id, namePdf, dataItems, userId, fileFotoUrl = null, engineId = null, typeEngineId = null) => {
  // Cek apakah item dengan id tersebut ada
  const existingItem = await trx(TABLE_NAME)
    .where({ item_catalog_engine_id: id, is_delete: false })
    .whereNull('deleted_at')
    .first();
  
  if (!existingItem) {
    return null;
  }
  
  // Find or create master_pdf dengan transaction
  const masterPdfId = await findOrCreateMasterPdfWithTransaction(trx, namePdf, userId, fileFotoUrl);
  
  console.log('=== REPOSITORY UPDATE: masterPdfId:', masterPdfId);
  console.log('=== REPOSITORY UPDATE: engineId:', engineId);
  console.log('=== REPOSITORY UPDATE: typeEngineId:', typeEngineId);
  console.log('=== REPOSITORY UPDATE: dataItems count:', dataItems.length);
  
  const results = [];
  
  // Process each item - check if exists then update or insert
  for (const item of dataItems) {
    console.log('=== REPOSITORY UPDATE: Processing item ===');
    console.log('Raw item from dataItems:', JSON.stringify(item, null, 2));
    
    const itemData = {
      master_pdf_id: masterPdfId,
      engine_id: engineId || null,
      type_engine_id: typeEngineId || null,
      target_id: item.target_id || null,
      diagram_serial_number: item.diagram_serial_number || null,
      part_number: item.part_number || null,
      catalog_item_name_en: item.catalog_item_name_en || null,
      catalog_item_name_ch: item.catalog_item_name_ch || null,
      description: item.description || null,
      quantity: item.quantity || null
    };
    
    console.log('ItemData to insert/update:', JSON.stringify(itemData, null, 2));
    
    // Check if item already exists based on unique combination
    const whereClause = {
      master_pdf_id: masterPdfId,
      is_delete: false
    };
    
    // Add conditions for engine_id, type_engine_id, target_id only if they are not null
    if (engineId) whereClause.engine_id = engineId;
    if (typeEngineId) whereClause.type_engine_id = typeEngineId;
    if (item.target_id) whereClause.target_id = item.target_id;
    
    const existing = await trx(TABLE_NAME)
      .where(whereClause)
      .whereNull('deleted_at')
      .first();
    
    if (existing) {
      // UPDATE existing item
      const [updated] = await trx(TABLE_NAME)
        .where({ item_catalog_engine_id: existing.item_catalog_engine_id })
        .update({
          ...itemData,
          updated_at: trx.fn.now(),
          updated_by: userId
        })
        .returning('*');
      
      results.push(updated);
    } else {
      // INSERT new item
      const [inserted] = await trx(TABLE_NAME)
        .insert({
          ...itemData,
          created_at: trx.fn.now(),
          created_by: userId,
          updated_at: trx.fn.now(),
          updated_by: userId,
          is_delete: false
        })
        .returning('*');
      
      results.push(inserted);
    }
  }
  
  return {
    master_pdf_id: masterPdfId,
    items: results
  };
};

/**
 * Soft delete item
 */
const remove = async (id, userId) => {
  const [result] = await db(TABLE_NAME)
    .where({ item_catalog_engine_id: id, is_delete: false })
    .whereNull('deleted_at')
    .update({
      is_delete: true,
      deleted_at: db.fn.now(),
      deleted_by: userId
    })
    .returning('*');
  
  return result;
};

module.exports = {
  findAll,
  findById,
  findByMasterPdfId,
  findOrCreateMasterPdf,
  findOrCreateMasterPdfWithTransaction,
  create,
  createWithTransaction,
  update,
  updateWithTransaction,
  remove
};

