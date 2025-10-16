const { pgCore: db } = require('../../config/database');

// Mapping table names based on master_catalog
const getTableName = (masterCatalog) => {
  const tableMap = {
    'engine': 'item_catalog_engines',
    'axle': 'item_catalog_axles',
    'cabin': 'item_catalog_cabines',
    'steering': 'item_catalog_steerings',
    'transmission': 'item_catalog_transmissions'
  };
  return tableMap[masterCatalog.toLowerCase()];
};

// Mapping ID field names based on master_catalog
const getIdFieldName = (masterCatalog) => {
  const idFieldMap = {
    'engine': 'item_catalog_engine_id',
    'axle': 'item_catalog_axle_id',
    'cabin': 'item_catalog_cabine_id',
    'steering': 'item_catalog_steering_id',
    'transmission': 'item_catalog_transmission_id'
  };
  return idFieldMap[masterCatalog.toLowerCase()];
};

// Mapping master table ID field names
const getMasterTableIdField = (masterCatalog) => {
  const masterIdFieldMap = {
    'engine': 'engines_id',
    'axle': 'axel_id',
    'cabin': 'cabines_id',
    'steering': 'steering_id',
    'transmission': 'transmission_id'
  };
  return masterIdFieldMap[masterCatalog.toLowerCase()];
};

// Mapping related table names based on master_catalog
const getRelatedTables = (masterCatalog) => {
  const relatedMap = {
    'engine': {
      master: 'engines',
      masterNameEn: 'engines_name_en',
      masterNameCn: 'engines_name_cn',
      type: 'type_engines',
      typeNameEn: 'type_engine_name_en',
      typeNameCn: 'type_engine_name_cn',
      masterIdField: 'engine_id',
      typeIdField: 'type_engine_id'
    },
    'axle': {
      master: 'axels',
      masterNameEn: 'axel_name_en',
      masterNameCn: 'axel_name_cn',
      type: 'type_axels',
      typeNameEn: 'type_axel_name_en',
      typeNameCn: 'type_axel_name_cn',
      masterIdField: 'axel_id',
      typeIdField: 'type_axel_id'
    },
    'cabin': {
      master: 'cabines',
      masterNameEn: 'cabines_name_en',
      masterNameCn: 'cabines_name_cn',
      type: 'type_cabines',
      typeNameEn: 'type_cabine_name_en',
      typeNameCn: 'type_cabine_name_cn',
      masterIdField: 'cabine_id',
      typeIdField: 'type_cabine_id'
    },
    'steering': {
      master: 'steerings',
      masterNameEn: 'steering_name_en',
      masterNameCn: 'steering_name_cn',
      type: 'type_steerings',
      typeNameEn: 'type_steering_name_en',
      typeNameCn: 'type_steering_name_cn',
      masterIdField: 'steering_id',
      typeIdField: 'type_steering_id'
    },
    'transmission': {
      master: 'transmissions',
      masterNameEn: 'transmission_name_en',
      masterNameCn: 'transmission_name_cn',
      type: 'type_transmissions',
      typeNameEn: 'type_transmission_name_en',
      typeNameCn: 'type_transmission_name_cn',
      masterIdField: 'transmission_id',
      typeIdField: 'type_transmission_id'
    }
  };
  return relatedMap[masterCatalog.toLowerCase()];
};

const MASTER_PDF_TABLE = 'master_pdf';

/**
 * Find or create master PDF
 */
const findOrCreateMasterPdf = async (namePdf, masterCatalog = null, createdBy = null) => {
  // Cek apakah master_pdf sudah ada dengan kombinasi name_pdf dan master_catalog
  const whereClause = { name_pdf: namePdf, is_delete: false };
  if (masterCatalog) {
    whereClause.master_catalog = masterCatalog;
  }
  
  const existing = await db(MASTER_PDF_TABLE)
    .where(whereClause)
    .whereNull('deleted_at')
    .first();
  
  if (existing) {
    return existing.master_pdf_id;
  }
  
  // Jika belum ada, insert baru
  const insertData = {
    name_pdf: namePdf,
    created_at: db.fn.now(),
    created_by: createdBy,
    updated_at: db.fn.now(),
    updated_by: createdBy,
    is_delete: false
  };
  
  if (masterCatalog) {
    insertData.master_catalog = masterCatalog;
  }
  
  const [newMasterPdf] = await db(MASTER_PDF_TABLE)
    .insert(insertData)
    .returning('master_pdf_id');
  
  return newMasterPdf.master_pdf_id;
};

/**
 * Find or create master PDF dengan transaction
 */
const findOrCreateMasterPdfWithTransaction = async (trx, namePdf, masterCatalog = null, createdBy = null) => {
  // Cek apakah master_pdf sudah ada dengan kombinasi name_pdf dan master_catalog
  const whereClause = { name_pdf: namePdf, is_delete: false };
  if (masterCatalog) {
    whereClause.master_catalog = masterCatalog;
  }
  
  const existing = await trx(MASTER_PDF_TABLE)
    .where(whereClause)
    .whereNull('deleted_at')
    .first();
  
  if (existing) {
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
  
  if (masterCatalog) {
    insertData.master_catalog = masterCatalog;
  }
  
  const [newMasterPdf] = await trx(MASTER_PDF_TABLE)
    .insert(insertData)
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
    master_pdf_id = null,
    master_catalog = null
  } = filters;
  
  const offset = (page - 1) * limit;
  
  // If master_catalog is specified, query specific table
  if (master_catalog) {
    return await findAllByCatalogType(filters, master_catalog, offset);
  }
  
  // If no master_catalog specified, query all tables and combine results
  const allCatalogTypes = ['engine', 'axle', 'cabin', 'steering', 'transmission'];
  const allResults = [];
  let totalCount = 0;
  
  for (const catalogType of allCatalogTypes) {
    const result = await findAllByCatalogType(filters, catalogType, 0); // offset 0 for individual queries
    if (result.items.length > 0) {
      allResults.push(...result.items);
      totalCount += result.pagination.total;
    }
  }
  
  // Sort combined results
  allResults.sort((a, b) => {
    const aValue = a[sort_by];
    const bValue = b[sort_by];
    if (sort_order === 'desc') {
      return bValue > aValue ? 1 : -1;
    } else {
      return aValue > bValue ? 1 : -1;
    }
  });
  
  // Apply pagination to combined results
  const paginatedResults = allResults.slice(offset, offset + limit);
  
  return {
    items: paginatedResults,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit)
    }
  };
};

/**
 * Find all items by specific catalog type
 */
const findAllByCatalogType = async (filters, masterCatalog, offset) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    sort_by = 'created_at',
    sort_order = 'desc',
    master_pdf_id = null
  } = filters;
  
  const tableName = getTableName(masterCatalog);
  const relatedTables = getRelatedTables(masterCatalog);
  
  if (!tableName || !relatedTables) {
    throw new Error(`Invalid master_catalog: ${masterCatalog}`);
  }
  
  let query = db(tableName)
    .select(
      `${tableName}.*`,
      'master_pdf.name_pdf',
      'master_pdf.master_catalog',
      `${relatedTables.master}.${relatedTables.masterNameEn}`,
      `${relatedTables.master}.${relatedTables.masterNameCn}`,
      `${relatedTables.type}.${relatedTables.typeNameEn}`,
      `${relatedTables.type}.${relatedTables.typeNameCn}`
    )
    .leftJoin('master_pdf', `${tableName}.master_pdf_id`, 'master_pdf.master_pdf_id')
    .leftJoin(relatedTables.master, `${tableName}.${relatedTables.masterIdField}`, `${relatedTables.master}.${getMasterTableIdField(masterCatalog)}`)
    .leftJoin(relatedTables.type, `${tableName}.${relatedTables.typeIdField}`, `${relatedTables.type}.${relatedTables.typeIdField}`)
    .where({ [`${tableName}.is_delete`]: false })
    .whereNull(`${tableName}.deleted_at`);
  
  // Filter by master_pdf_id jika diberikan (skip jika string kosong)
  if (master_pdf_id && master_pdf_id !== '') {
    query = query.where({ [`${tableName}.master_pdf_id`]: master_pdf_id });
  }
  
  // Search
  if (search) {
    query = query.where((builder) => {
      builder
        .where('master_pdf.name_pdf', 'ilike', `%${search}%`)
        .orWhere(`${tableName}.catalog_item_name_en`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.catalog_item_name_ch`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.part_number`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.target_id`, 'ilike', `%${search}%`);
    });
  }
  
  const data = await query
    .clone()
    .orderBy(`${tableName}.${sort_by}`, sort_order)
    .limit(limit)
    .offset(offset);
  
  // Count total dengan query terpisah
  const countQuery = db(tableName)
    .where({ [`${tableName}.is_delete`]: false })
    .whereNull(`${tableName}.deleted_at`);
  
  if (master_pdf_id && master_pdf_id !== '') {
    countQuery.where({ [`${tableName}.master_pdf_id`]: master_pdf_id });
  }
  
  if (search) {
    countQuery.leftJoin('master_pdf', `${tableName}.master_pdf_id`, 'master_pdf.master_pdf_id')
      .where((builder) => {
        builder
          .where('master_pdf.name_pdf', 'ilike', `%${search}%`)
          .orWhere(`${tableName}.catalog_item_name_en`, 'ilike', `%${search}%`)
          .orWhere(`${tableName}.catalog_item_name_ch`, 'ilike', `%${search}%`)
          .orWhere(`${tableName}.part_number`, 'ilike', `%${search}%`)
          .orWhere(`${tableName}.target_id`, 'ilike', `%${search}%`);
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
const findById = async (id, masterCatalog = null) => {
  // If master_catalog is specified, query specific table
  if (masterCatalog) {
    return await findByIdByCatalogType(id, masterCatalog);
  }
  
  // If no master_catalog specified, search in all tables
  const allCatalogTypes = ['engine', 'axle', 'cabin', 'steering', 'transmission'];
  
  for (const catalogType of allCatalogTypes) {
    const result = await findByIdByCatalogType(id, catalogType);
    if (result) {
      return result;
    }
  }
  
  return null;
};

/**
 * Find single item by ID for specific catalog type
 */
const findByIdByCatalogType = async (id, masterCatalog) => {
  const tableName = getTableName(masterCatalog);
  const relatedTables = getRelatedTables(masterCatalog);
  const idFieldName = getIdFieldName(masterCatalog);
  
  if (!tableName || !relatedTables || !idFieldName) {
    return null;
  }
  
  const data = await db(tableName)
    .select(
      `${tableName}.*`,
      'master_pdf.name_pdf',
      'master_pdf.master_catalog',
      `${relatedTables.master}.${relatedTables.masterNameEn}`,
      `${relatedTables.master}.${relatedTables.masterNameCn}`,
      `${relatedTables.type}.${relatedTables.typeNameEn}`,
      `${relatedTables.type}.${relatedTables.typeNameCn}`
    )
    .leftJoin('master_pdf', `${tableName}.master_pdf_id`, 'master_pdf.master_pdf_id')
    .leftJoin(relatedTables.master, `${tableName}.${relatedTables.masterIdField}`, `${relatedTables.master}.${getMasterTableIdField(masterCatalog)}`)
    .leftJoin(relatedTables.type, `${tableName}.${relatedTables.typeIdField}`, `${relatedTables.type}.${relatedTables.typeIdField}`)
    .where({ [`${tableName}.${idFieldName}`]: id, [`${tableName}.is_delete`]: false })
    .whereNull(`${tableName}.deleted_at`)
    .first();
  
  return data;
};

/**
 * Find all items by master_pdf_id
 */
const findByMasterPdfId = async (masterPdfId, masterCatalog = null) => {
  // If master_catalog is specified, query specific table
  if (masterCatalog) {
    return await findByMasterPdfIdByCatalogType(masterPdfId, masterCatalog);
  }
  
  // If no master_catalog specified, search in all tables and combine results
  const allCatalogTypes = ['engine', 'axle', 'cabin', 'steering', 'transmission'];
  const allResults = [];
  
  for (const catalogType of allCatalogTypes) {
    const result = await findByMasterPdfIdByCatalogType(masterPdfId, catalogType);
    if (result.length > 0) {
      allResults.push(...result);
    }
  }
  
  // Sort by created_at desc
  allResults.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
  return allResults;
};

/**
 * Find all items by master_pdf_id for specific catalog type
 */
const findByMasterPdfIdByCatalogType = async (masterPdfId, masterCatalog) => {
  const tableName = getTableName(masterCatalog);
  const relatedTables = getRelatedTables(masterCatalog);
  
  if (!tableName || !relatedTables) {
    return [];
  }
  
  const data = await db(tableName)
    .select(
      `${tableName}.*`,
      'master_pdf.name_pdf',
      'master_pdf.master_catalog',
      `${relatedTables.master}.${relatedTables.masterNameEn}`,
      `${relatedTables.master}.${relatedTables.masterNameCn}`,
      `${relatedTables.type}.${relatedTables.typeNameEn}`,
      `${relatedTables.type}.${relatedTables.typeNameCn}`
    )
    .leftJoin('master_pdf', `${tableName}.master_pdf_id`, 'master_pdf.master_pdf_id')
    .leftJoin(relatedTables.master, `${tableName}.${relatedTables.masterIdField}`, `${relatedTables.master}.${getMasterTableIdField(masterCatalog)}`)
    .leftJoin(relatedTables.type, `${tableName}.${relatedTables.typeIdField}`, `${relatedTables.type}.${relatedTables.typeIdField}`)
    .where({ [`${tableName}.master_pdf_id`]: masterPdfId, [`${tableName}.is_delete`]: false })
    .whereNull(`${tableName}.deleted_at`)
    .orderBy(`${tableName}.created_at`, 'desc');
  
  return data;
};

/**
 * Create new items dengan transaction (bulk insert/update - UPSERT)
 * Jika kombinasi master_pdf_id + master_id + type_id + target_id sudah ada, maka UPDATE
 * Jika belum ada, maka INSERT
 */
const createWithTransaction = async (trx, namePdf, dataItems, userId, fileFotoUrl = null, masterCatalog, masterCategoryId = null, typeCategoryId = null) => {
  // Find or create master_pdf dengan transaction
  const masterPdfId = await findOrCreateMasterPdfWithTransaction(trx, namePdf, masterCatalog, userId);
  
  const tableName = getTableName(masterCatalog);
  const relatedTables = getRelatedTables(masterCatalog);
  const idFieldName = getIdFieldName(masterCatalog);
  
  if (!tableName || !relatedTables || !idFieldName) {
    throw new Error(`Invalid master_catalog: ${masterCatalog}`);
  }
  
  console.log('=== REPOSITORY CREATE: masterPdfId:', masterPdfId);
  console.log('=== REPOSITORY CREATE: masterCatalog:', masterCatalog);
  console.log('=== REPOSITORY CREATE: tableName:', tableName);
  console.log('=== REPOSITORY CREATE: fileFotoUrl:', fileFotoUrl);
  console.log('=== REPOSITORY CREATE: dataItems count:', dataItems.length);
  
  const results = [];
  
  // Process each item - check if exists then update or insert
  for (const item of dataItems) {
    console.log('=== REPOSITORY CREATE: Processing item ===');
    console.log('Raw item from dataItems:', JSON.stringify(item, null, 2));
    
    const itemData = {
      master_pdf_id: masterPdfId,
      [relatedTables.masterIdField]: masterCategoryId || null, // Set from request body
      [relatedTables.typeIdField]: typeCategoryId || null, // Set from request body
      target_id: item.target_id || null,
      diagram_serial_number: item.diagram_serial_number || null,
      part_number: item.part_number || null,
      catalog_item_name_en: item.catalog_item_name_en || null,
      catalog_item_name_ch: item.catalog_item_name_ch || null,
      description: item.description || null,
      quantity: item.quantity || null,
      file_foto: fileFotoUrl || null
    };
    
    console.log('ItemData to insert/update:', JSON.stringify(itemData, null, 2));
    
    // Check if item already exists based on unique combination
    const whereClause = {
      master_pdf_id: masterPdfId,
      is_delete: false
    };
    
    // Add conditions for master_id, type_id, target_id only if they are not null
    if (masterCategoryId) whereClause[relatedTables.masterIdField] = masterCategoryId;
    if (typeCategoryId) whereClause[relatedTables.typeIdField] = typeCategoryId;
    if (item.target_id) whereClause.target_id = item.target_id;
    
    const existing = await trx(tableName)
      .where(whereClause)
      .whereNull('deleted_at')
      .first();
    
    if (existing) {
      // UPDATE existing item
      const updateData = { ...itemData };
      // Only update file_foto if new file is uploaded
      if (!fileFotoUrl) {
        delete updateData.file_foto;
      }
      
      const [updated] = await trx(tableName)
        .where({ [idFieldName]: existing[idFieldName] })
        .update({
          ...updateData,
          updated_at: trx.fn.now(),
          updated_by: userId
        })
        .returning('*');
      
      results.push(updated);
    } else {
      // INSERT new item
      const [inserted] = await trx(tableName)
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
 * Update items by master_pdf_id dengan transaction (UPSERT)
 * Jika kombinasi master_pdf_id + master_id + type_id + target_id sudah ada, maka UPDATE
 * Jika belum ada, maka INSERT
 */
const updateWithTransaction = async (trx, id, namePdf, dataItems, userId, fileFotoUrl = null, masterCatalog, masterCategoryId = null, typeCategoryId = null) => {
  // Find the item first to determine which table it belongs to
  let existingItem = null;
  let itemTableName = null;
  let itemRelatedTables = null;
  let itemIdFieldName = null;
  
  // Search in all tables to find the item
  const allCatalogTypes = ['engine', 'axle', 'cabin', 'steering', 'transmission'];
  
  for (const catalogType of allCatalogTypes) {
    const tableName = getTableName(catalogType);
    const relatedTables = getRelatedTables(catalogType);
    const idFieldName = getIdFieldName(catalogType);
    
    if (!tableName || !relatedTables || !idFieldName) continue;
    
    const found = await trx(tableName)
      .where({ [idFieldName]: id, is_delete: false })
      .whereNull('deleted_at')
      .first();
    
    if (found) {
      existingItem = found;
      itemTableName = tableName;
      itemRelatedTables = relatedTables;
      itemIdFieldName = idFieldName;
      break;
    }
  }
  
  if (!existingItem) {
    return null;
  }
  
  // Find or create master_pdf dengan transaction
  const masterPdfId = await findOrCreateMasterPdfWithTransaction(trx, namePdf, masterCatalog, userId);
  
  console.log('=== REPOSITORY UPDATE: masterPdfId:', masterPdfId);
  console.log('=== REPOSITORY UPDATE: masterCatalog:', masterCatalog);
  console.log('=== REPOSITORY UPDATE: itemTableName:', itemTableName);
  console.log('=== REPOSITORY UPDATE: fileFotoUrl:', fileFotoUrl);
  console.log('=== REPOSITORY UPDATE: dataItems count:', dataItems.length);
  
  const results = [];
  
  // Process each item - check if exists then update or insert
  for (const item of dataItems) {
    console.log('=== REPOSITORY UPDATE: Processing item ===');
    console.log('Raw item from dataItems:', JSON.stringify(item, null, 2));
    
    const itemData = {
      master_pdf_id: masterPdfId,
      [itemRelatedTables.masterIdField]: masterCategoryId || null, // Set from request body
      [itemRelatedTables.typeIdField]: typeCategoryId || null, // Set from request body
      target_id: item.target_id || null,
      diagram_serial_number: item.diagram_serial_number || null,
      part_number: item.part_number || null,
      catalog_item_name_en: item.catalog_item_name_en || null,
      catalog_item_name_ch: item.catalog_item_name_ch || null,
      description: item.description || null,
      quantity: item.quantity || null,
      file_foto: fileFotoUrl || null
    };
    
    console.log('ItemData to insert/update:', JSON.stringify(itemData, null, 2));
    
    // Check if item already exists based on unique combination
    const whereClause = {
      master_pdf_id: masterPdfId,
      is_delete: false
    };
    
    // Add conditions for master_id, type_id, target_id only if they are not null
    if (masterCategoryId) whereClause[itemRelatedTables.masterIdField] = masterCategoryId;
    if (typeCategoryId) whereClause[itemRelatedTables.typeIdField] = typeCategoryId;
    if (item.target_id) whereClause.target_id = item.target_id;
    
    const existing = await trx(itemTableName)
      .where(whereClause)
      .whereNull('deleted_at')
      .first();
    
    if (existing) {
      // UPDATE existing item
      const updateData = { ...itemData };
      // Only update file_foto if new file is uploaded
      if (!fileFotoUrl) {
        delete updateData.file_foto;
      }
      
      const [updated] = await trx(itemTableName)
        .where({ [itemIdFieldName]: existing[itemIdFieldName] })
        .update({
          ...updateData,
          updated_at: trx.fn.now(),
          updated_by: userId
        })
        .returning('*');
      
      results.push(updated);
    } else {
      // INSERT new item
      const [inserted] = await trx(itemTableName)
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
  // Search in all tables to find and delete the item
  const allCatalogTypes = ['engine', 'axle', 'cabin', 'steering', 'transmission'];
  
  for (const catalogType of allCatalogTypes) {
    const tableName = getTableName(catalogType);
    const idFieldName = getIdFieldName(catalogType);
    
    if (!tableName || !idFieldName) continue;
    
    const [result] = await db(tableName)
      .where({ [idFieldName]: id, is_delete: false })
      .whereNull('deleted_at')
      .update({
        is_delete: true,
        deleted_at: db.fn.now(),
        deleted_by: userId
      })
      .returning('*');
    
    if (result) {
      return result;
    }
  }
  
  return null;
};

module.exports = {
  findAll,
  findById,
  findByMasterPdfId,
  findOrCreateMasterPdf,
  findOrCreateMasterPdfWithTransaction,
  createWithTransaction,
  updateWithTransaction,
  remove
};
