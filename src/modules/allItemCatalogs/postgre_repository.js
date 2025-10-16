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
      typeIdField: 'type_engine_id',
      // Response field mapping untuk konsistensi
      responseMasterNameEn: 'category_name_en',
      responseMasterNameCn: 'category_name_cn',
      responseTypeNameEn: 'type_category_name_en',
      responseTypeNameCn: 'type_category_name_cn'
    },
    'axle': {
      master: 'axels',
      masterNameEn: 'axel_name_en',
      masterNameCn: 'axel_name_cn',
      type: 'type_axels',
      typeNameEn: 'type_axel_name_en',
      typeNameCn: 'type_axel_name_cn',
      masterIdField: 'axel_id',
      typeIdField: 'type_axel_id',
      // Response field mapping untuk konsistensi
      responseMasterNameEn: 'category_name_en',
      responseMasterNameCn: 'category_name_cn',
      responseTypeNameEn: 'type_category_name_en',
      responseTypeNameCn: 'type_category_name_cn'
    },
    'cabin': {
      master: 'cabines',
      masterNameEn: 'cabines_name_en',
      masterNameCn: 'cabines_name_cn',
      type: 'type_cabines',
      typeNameEn: 'type_cabine_name_en',
      typeNameCn: 'type_cabine_name_cn',
      masterIdField: 'cabine_id',
      typeIdField: 'type_cabine_id',
      // Response field mapping untuk konsistensi
      responseMasterNameEn: 'category_name_en',
      responseMasterNameCn: 'category_name_cn',
      responseTypeNameEn: 'type_category_name_en',
      responseTypeNameCn: 'type_category_name_cn'
    },
    'steering': {
      master: 'steerings',
      masterNameEn: 'steering_name_en',
      masterNameCn: 'steering_name_cn',
      type: 'type_steerings',
      typeNameEn: 'type_steering_name_en',
      typeNameCn: 'type_steering_name_cn',
      masterIdField: 'steering_id',
      typeIdField: 'type_steering_id',
      // Response field mapping untuk konsistensi
      responseMasterNameEn: 'category_name_en',
      responseMasterNameCn: 'category_name_cn',
      responseTypeNameEn: 'type_category_name_en',
      responseTypeNameCn: 'type_category_name_cn'
    },
    'transmission': {
      master: 'transmissions',
      masterNameEn: 'transmission_name_en',
      masterNameCn: 'transmission_name_cn',
      type: 'type_transmissions',
      typeNameEn: 'type_transmission_name_en',
      typeNameCn: 'type_transmission_name_cn',
      masterIdField: 'transmission_id',
      typeIdField: 'type_transmission_id',
      // Response field mapping untuk konsistensi
      responseMasterNameEn: 'category_name_en',
      responseMasterNameCn: 'category_name_cn',
      responseTypeNameEn: 'type_category_name_en',
      responseTypeNameCn: 'type_category_name_cn'
    }
  };
  return relatedMap[masterCatalog.toLowerCase()];
};

const MASTER_PDF_TABLE = 'master_pdf';

/**
 * Helper function to format response data with consistent field names
 */
const formatResponseData = (data, masterCatalog) => {
  if (!data || !Array.isArray(data)) {
    return data;
  }
  
  const relatedTables = getRelatedTables(masterCatalog);
  if (!relatedTables) {
    return data;
  }
  
  return data.map(item => {
    const formattedItem = { ...item };
    
    // Rename master category fields
    if (item[relatedTables.masterNameEn]) {
      formattedItem[relatedTables.responseMasterNameEn] = item[relatedTables.masterNameEn];
      delete formattedItem[relatedTables.masterNameEn];
    }
    if (item[relatedTables.masterNameCn]) {
      formattedItem[relatedTables.responseMasterNameCn] = item[relatedTables.masterNameCn];
      delete formattedItem[relatedTables.masterNameCn];
    }
    
    // Rename type category fields
    if (item[relatedTables.typeNameEn]) {
      formattedItem[relatedTables.responseTypeNameEn] = item[relatedTables.typeNameEn];
      delete formattedItem[relatedTables.typeNameEn];
    }
    if (item[relatedTables.typeNameCn]) {
      formattedItem[relatedTables.responseTypeNameCn] = item[relatedTables.typeNameCn];
      delete formattedItem[relatedTables.typeNameCn];
    }
    
    return formattedItem;
  });
};

/**
 * Find or create master PDF
 */
const findOrCreateMasterPdf = async (namePdf, masterCatalog = null, createdBy = null) => {
  // Cek apakah master_pdf sudah ada dengan kombinasi name_pdf dan master_catalog
  const whereClause = { name_pdf: namePdf, is_delete: false };
  if (masterCatalog && masterCatalog.trim() !== '') {
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
  
  if (masterCatalog && masterCatalog.trim() !== '') {
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
  if (masterCatalog && masterCatalog.trim() !== '') {
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
  
  if (masterCatalog && masterCatalog.trim() !== '') {
    insertData.master_catalog = masterCatalog;
  }
  
  const [newMasterPdf] = await trx(MASTER_PDF_TABLE)
    .insert(insertData)
    .returning('master_pdf_id');
  
  return newMasterPdf.master_pdf_id;
};

/**
 * Find all items with pagination and filter
 * Total count dihitung berdasarkan tabel master_pdf, tapi pagination tetap individual items
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
  
  // If master_catalog is specified and not empty, filter by master_catalog column in master_pdf table
  if (master_catalog && master_catalog.trim() !== '') {
    return await findAllByMasterCatalog(filters, master_catalog, offset);
  }
  
  // Query all tables and combine results (seperti logika asli)
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
  
  // Gunakan total count dari individual items (bukan master_pdf)
  const total = { count: allResults.length };
  
  return {
    items: paginatedResults,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: parseInt(total.count), // Total berdasarkan master_pdf
      totalPages: Math.ceil(total.count / limit)
    }
  };
};

/**
 * Find all items by master_catalog filter (filter by master_pdf.master_catalog column)
 * Total count dihitung berdasarkan tabel master_pdf, tapi pagination tetap individual items
 */
const findAllByMasterCatalog = async (filters, masterCatalog, offset) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    sort_by = 'created_at',
    sort_order = 'desc',
    master_pdf_id = null
  } = filters;
  
  // Query all tables that match the master_catalog filter
  const allCatalogTypes = ['engine', 'axle', 'cabin', 'steering', 'transmission'];
  const allResults = [];
  let totalCount = 0;
  
  for (const catalogType of allCatalogTypes) {
    const result = await findAllByCatalogTypeWithMasterCatalogFilter(filters, catalogType, masterCatalog, 0);
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
  
  // Gunakan total count dari individual items (bukan master_pdf)
  const total = { count: allResults.length };
  
  return {
    items: paginatedResults,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: parseInt(total.count), // Total berdasarkan master_pdf
      totalPages: Math.ceil(total.count / limit)
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
  
  // Search in multiple tables and columns
  if (search) {
    query = query.where((builder) => {
      builder
        // Search in master_pdf table
        .where('master_pdf.name_pdf', 'ilike', `%${search}%`)
        // Search in item catalog table
        .orWhere(`${tableName}.catalog_item_name_en`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.catalog_item_name_ch`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.part_number`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.target_id`, 'ilike', `%${search}%`)
        // Search in master table (engines, axels, cabines, steerings, transmissions)
        .orWhere(`${relatedTables.master}.${relatedTables.masterNameEn}`, 'ilike', `%${search}%`)
        .orWhere(`${relatedTables.master}.${relatedTables.masterNameCn}`, 'ilike', `%${search}%`)
        // Search in type table (type_engines, type_axels, type_cabines, type_steerings, type_transmissions)
        .orWhere(`${relatedTables.type}.${relatedTables.typeNameEn}`, 'ilike', `%${search}%`)
        .orWhere(`${relatedTables.type}.${relatedTables.typeNameCn}`, 'ilike', `%${search}%`);
    });
  }
  
  const data = await query
    .clone()
    .orderBy(`${tableName}.${sort_by}`, sort_order)
    .limit(limit)
    .offset(offset);
  
  // Count total dengan query terpisah
  const countQuery = db(tableName)
    .leftJoin('master_pdf', `${tableName}.master_pdf_id`, 'master_pdf.master_pdf_id')
    .leftJoin(relatedTables.master, `${tableName}.${relatedTables.masterIdField}`, `${relatedTables.master}.${getMasterTableIdField(masterCatalog)}`)
    .leftJoin(relatedTables.type, `${tableName}.${relatedTables.typeIdField}`, `${relatedTables.type}.${relatedTables.typeIdField}`)
    .where({ [`${tableName}.is_delete`]: false })
    .whereNull(`${tableName}.deleted_at`);
  
  if (master_pdf_id && master_pdf_id !== '') {
    countQuery.where({ [`${tableName}.master_pdf_id`]: master_pdf_id });
  }
  
  if (search) {
    countQuery.where((builder) => {
      builder
        // Search in master_pdf table
        .where('master_pdf.name_pdf', 'ilike', `%${search}%`)
        // Search in item catalog table
        .orWhere(`${tableName}.catalog_item_name_en`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.catalog_item_name_ch`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.part_number`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.target_id`, 'ilike', `%${search}%`)
        // Search in master table (engines, axels, cabines, steerings, transmissions)
        .orWhere(`${relatedTables.master}.${relatedTables.masterNameEn}`, 'ilike', `%${search}%`)
        .orWhere(`${relatedTables.master}.${relatedTables.masterNameCn}`, 'ilike', `%${search}%`)
        // Search in type table (type_engines, type_axels, type_cabines, type_steerings, type_transmissions)
        .orWhere(`${relatedTables.type}.${relatedTables.typeNameEn}`, 'ilike', `%${search}%`)
        .orWhere(`${relatedTables.type}.${relatedTables.typeNameCn}`, 'ilike', `%${search}%`);
    });
  }
  
  const total = await countQuery.count('* as count').first();
  
  // Format response data dengan field names yang konsisten
  const formattedData = formatResponseData(data, masterCatalog);
  
  return {
    items: formattedData,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: parseInt(total.count),
      totalPages: Math.ceil(total.count / limit)
    }
  };
};

/**
 * Find all items by specific catalog type with master_catalog filter
 */
const findAllByCatalogTypeWithMasterCatalogFilter = async (filters, masterCatalog, masterCatalogFilter, offset) => {
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
    .whereNull(`${tableName}.deleted_at`)
    // Filter by master_catalog column in master_pdf table
    .where({ 'master_pdf.master_catalog': masterCatalogFilter });
  
  // Filter by master_pdf_id jika diberikan (skip jika string kosong)
  if (master_pdf_id && master_pdf_id !== '') {
    query = query.where({ [`${tableName}.master_pdf_id`]: master_pdf_id });
  }
  
  // Search in multiple tables and columns
  if (search) {
    query = query.where((builder) => {
      builder
        // Search in master_pdf table
        .where('master_pdf.name_pdf', 'ilike', `%${search}%`)
        // Search in item catalog table
        .orWhere(`${tableName}.catalog_item_name_en`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.catalog_item_name_ch`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.part_number`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.target_id`, 'ilike', `%${search}%`)
        // Search in master table (engines, axels, cabines, steerings, transmissions)
        .orWhere(`${relatedTables.master}.${relatedTables.masterNameEn}`, 'ilike', `%${search}%`)
        .orWhere(`${relatedTables.master}.${relatedTables.masterNameCn}`, 'ilike', `%${search}%`)
        // Search in type table (type_engines, type_axels, type_cabines, type_steerings, type_transmissions)
        .orWhere(`${relatedTables.type}.${relatedTables.typeNameEn}`, 'ilike', `%${search}%`)
        .orWhere(`${relatedTables.type}.${relatedTables.typeNameCn}`, 'ilike', `%${search}%`);
    });
  }
  
  const data = await query
    .clone()
    .orderBy(`${tableName}.${sort_by}`, sort_order)
    .limit(limit)
    .offset(offset);
  
  // Count total dengan query terpisah
  const countQuery = db(tableName)
    .leftJoin('master_pdf', `${tableName}.master_pdf_id`, 'master_pdf.master_pdf_id')
    .leftJoin(relatedTables.master, `${tableName}.${relatedTables.masterIdField}`, `${relatedTables.master}.${getMasterTableIdField(masterCatalog)}`)
    .leftJoin(relatedTables.type, `${tableName}.${relatedTables.typeIdField}`, `${relatedTables.type}.${relatedTables.typeIdField}`)
    .where({ [`${tableName}.is_delete`]: false })
    .whereNull(`${tableName}.deleted_at`)
    // Filter by master_catalog column in master_pdf table
    .where({ 'master_pdf.master_catalog': masterCatalogFilter });
  
  if (master_pdf_id && master_pdf_id !== '') {
    countQuery.where({ [`${tableName}.master_pdf_id`]: master_pdf_id });
  }
  
  if (search) {
    countQuery.where((builder) => {
      builder
        // Search in master_pdf table
        .where('master_pdf.name_pdf', 'ilike', `%${search}%`)
        // Search in item catalog table
        .orWhere(`${tableName}.catalog_item_name_en`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.catalog_item_name_ch`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.part_number`, 'ilike', `%${search}%`)
        .orWhere(`${tableName}.target_id`, 'ilike', `%${search}%`)
        // Search in master table (engines, axels, cabines, steerings, transmissions)
        .orWhere(`${relatedTables.master}.${relatedTables.masterNameEn}`, 'ilike', `%${search}%`)
        .orWhere(`${relatedTables.master}.${relatedTables.masterNameCn}`, 'ilike', `%${search}%`)
        // Search in type table (type_engines, type_axels, type_cabines, type_steerings, type_transmissions)
        .orWhere(`${relatedTables.type}.${relatedTables.typeNameEn}`, 'ilike', `%${search}%`)
        .orWhere(`${relatedTables.type}.${relatedTables.typeNameCn}`, 'ilike', `%${search}%`);
    });
  }
  
  const total = await countQuery.count('* as count').first();
  
  // Format response data dengan field names yang konsisten
  const formattedData = formatResponseData(data, masterCatalog);
  
  return {
    items: formattedData,
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
  // If master_catalog is specified and not empty, query specific table
  if (masterCatalog && masterCatalog.trim() !== '') {
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
  
  // Format response data dengan field names yang konsisten
  if (data) {
    const formattedData = formatResponseData([data], masterCatalog);
    return formattedData[0];
  }
  
  return data;
};

/**
 * Find all items by master_pdf_id
 */
const findByMasterPdfId = async (masterPdfId, masterCatalog = null) => {
  // If master_catalog is specified and not empty, query specific table
  if (masterCatalog && masterCatalog.trim() !== '') {
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
  
  // Format response data dengan field names yang konsisten
  const formattedData = formatResponseData(data, masterCatalog);
  
  return formattedData;
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

/**
 * Find master_pdf by master_pdf_id
 */
const findMasterPdfById = async (masterPdfId) => {
  const data = await db(MASTER_PDF_TABLE)
    .where({ master_pdf_id: masterPdfId, is_delete: false })
    .whereNull('deleted_at')
    .first();
  
  return data;
};

/**
 * Find data master category by master_pdf_id dengan struktur yang diinginkan
 */
const findDataMasterCategoryByMasterPdfId = async (masterPdfId) => {
  const allCatalogTypes = ['engine', 'axle', 'cabin', 'steering', 'transmission'];
  const dataMasterCategory = [];
  
  for (const catalogType of allCatalogTypes) {
    const tableName = getTableName(catalogType);
    const relatedTables = getRelatedTables(catalogType);
    
    if (!tableName || !relatedTables) continue;
    
    // Get items untuk catalog type ini
    const items = await db(tableName)
      .select(
        `${tableName}.*`,
        `${relatedTables.master}.${relatedTables.masterNameEn} as master_category_name`,
        `${relatedTables.master}.${getMasterTableIdField(catalogType)} as master_category_id`,
        `${relatedTables.type}.${relatedTables.typeNameEn} as type_category_name`,
        `${relatedTables.type}.${relatedTables.typeIdField} as type_category_id`
      )
      .leftJoin(relatedTables.master, `${tableName}.${relatedTables.masterIdField}`, `${relatedTables.master}.${getMasterTableIdField(catalogType)}`)
      .leftJoin(relatedTables.type, `${tableName}.${relatedTables.typeIdField}`, `${relatedTables.type}.${relatedTables.typeIdField}`)
      .where({ [`${tableName}.master_pdf_id`]: masterPdfId, [`${tableName}.is_delete`]: false })
      .whereNull(`${tableName}.deleted_at`)
      .orderBy(`${tableName}.created_at`, 'desc');
    
    if (items.length > 0) {
      // Group items by master_category_id dan type_category_id
      const groupedItems = {};
      
      items.forEach(item => {
        const key = `${item.master_category_id || 'null'}_${item.type_category_id || 'null'}`;
        
        if (!groupedItems[key]) {
          groupedItems[key] = {
            master_catalog: catalogType,
            master_category_id: item.master_category_id,
            master_category_name: item.master_category_name,
            type_category_id: item.type_category_id,
            type_category_name: item.type_category_name,
            data_items: []
          };
        }
        
        // Add item to data_items
        const itemData = {
          items_id: item[getIdFieldName(catalogType)],
          master_pdf_id: item.master_pdf_id,
          target_id: item.target_id,
          diagram_serial_number: item.diagram_serial_number,
          part_number: item.part_number,
          catalog_item_name_en: item.catalog_item_name_en,
          catalog_item_name_ch: item.catalog_item_name_ch,
          description: item.description,
          quantity: item.quantity,
          file_foto: item.file_foto
        };
        
        groupedItems[key].data_items.push(itemData);
      });
      
      // Convert grouped items to array
      Object.values(groupedItems).forEach(group => {
        dataMasterCategory.push(group);
      });
    }
  }
  
  return dataMasterCategory;
};

module.exports = {
  findAll,
  findById,
  findByMasterPdfId,
  findMasterPdfById,
  findDataMasterCategoryByMasterPdfId,
  findOrCreateMasterPdf,
  findOrCreateMasterPdfWithTransaction,
  createWithTransaction,
  updateWithTransaction,
  remove
};
