const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'all_item_parents_catalogs';

/**
 * Create new all_item_parents_catalog record
 */
const create = async (data) => {
  const [result] = await db(TABLE_NAME)
    .insert(data)
    .returning('*');
  
  return result;
};

/**
 * Create new all_item_parents_catalog record with transaction
 */
const createWithTransaction = async (trx, data) => {
  const [result] = await trx(TABLE_NAME)
    .insert(data)
    .returning('*');
  
  return result;
};

/**
 * Find all_item_parents_catalog by master_pdf_id and master_catalog
 */
const findByMasterPdfAndCatalog = async (masterPdfId, masterCatalog) => {
  const result = await db(TABLE_NAME)
    .where({
      master_pdf_id: masterPdfId,
      master_catalog: masterCatalog,
      is_delete: false
    })
    .whereNull('deleted_at')
    .first();
  
  return result;
};

/**
 * Find all_item_parents_catalog by master_pdf_id
 */
const findByMasterPdfId = async (masterPdfId) => {
  const results = await db(TABLE_NAME)
    .where({
      master_pdf_id: masterPdfId,
      is_delete: false
    })
    .whereNull('deleted_at')
    .orderBy('created_at', 'desc');
  
  return results;
};

/**
 * Find all_item_parents_catalog by ID
 */
const findById = async (id) => {
  const result = await db(TABLE_NAME)
    .where({
      all_item_parents_catalog_id: id,
      is_delete: false
    })
    .whereNull('deleted_at')
    .first();
  
  return result;
};

/**
 * Update all_item_parents_catalog
 */
const update = async (id, data, userId) => {
  const [result] = await db(TABLE_NAME)
    .where({
      all_item_parents_catalog_id: id,
      is_delete: false
    })
    .whereNull('deleted_at')
    .update({
      ...data,
      updated_at: db.fn.now(),
      updated_by: userId
    })
    .returning('*');
  
  return result;
};

/**
 * Update all_item_parents_catalog with transaction
 */
const updateWithTransaction = async (trx, id, data, userId) => {
  const [result] = await trx(TABLE_NAME)
    .where({
      all_item_parents_catalog_id: id,
      is_delete: false
    })
    .whereNull('deleted_at')
    .update({
      ...data,
      updated_at: trx.fn.now(),
      updated_by: userId
    })
    .returning('*');
  
  return result;
};

/**
 * Soft delete all_item_parents_catalog
 */
const remove = async (id, userId) => {
  const [result] = await db(TABLE_NAME)
    .where({
      all_item_parents_catalog_id: id,
      is_delete: false
    })
    .whereNull('deleted_at')
    .update({
      is_delete: true,
      deleted_at: db.fn.now(),
      deleted_by: userId
    })
    .returning('*');
  
  return result;
};

/**
 * Find or create all_item_parents_catalog
 * Jika sudah ada dengan kombinasi master_pdf_id + master_catalog + master_category_id + type_category_id, return existing
 * Jika belum ada, create baru
 */
const findOrCreate = async (masterPdfId, masterCatalog, masterCategoryId, typeCategoryId, fileFoto, userId) => {
  // Cek apakah sudah ada
  const existing = await db(TABLE_NAME)
    .where({
      master_pdf_id: masterPdfId,
      master_catalog: masterCatalog,
      master_category_id: masterCategoryId,
      type_category_id: typeCategoryId,
      is_delete: false
    })
    .whereNull('deleted_at')
    .first();
  
  if (existing) {
    // Update file_foto jika ada yang baru
    if (fileFoto && fileFoto !== existing.file_foto) {
      return await update(existing.all_item_parents_catalog_id, {
        file_foto: fileFoto
      }, userId);
    }
    return existing;
  }
  
  // Create baru
  const data = {
    master_pdf_id: masterPdfId,
    master_catalog: masterCatalog,
    master_category_id: masterCategoryId,
    type_category_id: typeCategoryId,
    file_foto: fileFoto,
    created_at: db.fn.now(),
    created_by: userId,
    updated_at: db.fn.now(),
    updated_by: userId,
    is_delete: false
  };
  
  return await create(data);
};

/**
 * Find or create all_item_parents_catalog with transaction
 */
const findOrCreateWithTransaction = async (trx, masterPdfId, masterCatalog, masterCategoryId, typeCategoryId, fileFoto, userId) => {
  // Cek apakah sudah ada
  const existing = await trx(TABLE_NAME)
    .where({
      master_pdf_id: masterPdfId,
      master_catalog: masterCatalog,
      master_category_id: masterCategoryId,
      type_category_id: typeCategoryId,
      is_delete: false
    })
    .whereNull('deleted_at')
    .first();
  
  if (existing) {
    // Update file_foto jika ada yang baru
    if (fileFoto && fileFoto !== existing.file_foto) {
      return await updateWithTransaction(trx, existing.all_item_parents_catalog_id, {
        file_foto: fileFoto
      }, userId);
    }
    return existing;
  }
  
  // Create baru
  const data = {
    master_pdf_id: masterPdfId,
    master_catalog: masterCatalog,
    master_category_id: masterCategoryId,
    type_category_id: typeCategoryId,
    file_foto: fileFoto,
    created_at: trx.fn.now(),
    created_by: userId,
    updated_at: trx.fn.now(),
    updated_by: userId,
    is_delete: false
  };
  
  return await createWithTransaction(trx, data);
};

/**
 * Get all all_item_parents_catalogs with pagination and filters
 */
const findAll = async (filters = {}) => {
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
  
  let query = db(TABLE_NAME)
    .select(
      `${TABLE_NAME}.*`,
      'master_pdf.name_pdf'
    )
    .leftJoin('master_pdf', `${TABLE_NAME}.master_pdf_id`, 'master_pdf.master_pdf_id')
    .where({ [`${TABLE_NAME}.is_delete`]: false })
    .whereNull(`${TABLE_NAME}.deleted_at`);
  
  // Filter by master_pdf_id
  if (master_pdf_id && master_pdf_id !== '') {
    query = query.where({ [`${TABLE_NAME}.master_pdf_id`]: master_pdf_id });
  }
  
  // Filter by master_catalog
  if (master_catalog && master_catalog !== '') {
    query = query.where({ [`${TABLE_NAME}.master_catalog`]: master_catalog });
  }
  
  // Search functionality
  if (search) {
    query = query.where((builder) => {
      builder
        .where('master_pdf.name_pdf', 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.master_catalog`, 'ilike', `%${search}%`);
    });
  }
  
  // Get data with pagination
  const data = await query
    .clone()
    .orderBy(`${TABLE_NAME}.${sort_by}`, sort_order)
    .limit(limit)
    .offset(offset);
  
  // Count total
  const total = await query.count('* as count').first();
  
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

module.exports = {
  create,
  createWithTransaction,
  findByMasterPdfAndCatalog,
  findByMasterPdfId,
  findById,
  update,
  updateWithTransaction,
  remove,
  findOrCreate,
  findOrCreateWithTransaction,
  findAll
};
