const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'catalogs';

/**
 * Find all items with pagination
 */
const findAll = async (page = 1, limit = 10, filters = {}) => {
  const offset = (page - 1) * limit;
  
  let query = db(TABLE_NAME)
    .select(
      'catalogs.*',
      'categories.category_name_en',
      'categories.category_name_ch',
      db.raw('parent.catalog_name_en as parent_catalog_name')
    )
    .leftJoin('categories', function() {
      this.on('catalogs.category_id', '=', 'categories.category_id')
        .andOnNull('categories.deleted_at')
        .andOn('categories.is_delete', '=', db.raw('false'));
    })
    .leftJoin('catalogs as parent', function() {
      this.on('catalogs.catalog_parent_id', '=', 'parent.catalog_id')
        .andOnNull('parent.deleted_at')
        .andOn('parent.is_delete', '=', db.raw('false'));
    })
    .where({ 'catalogs.deleted_at': null });

  // Apply filters if provided
  if (filters.category_id) {
    query = query.where({ 'catalogs.category_id': filters.category_id });
  }
  if (filters.catalog_parent_id) {
    query = query.where({ 'catalogs.catalog_parent_id': filters.catalog_parent_id });
  }
  if (filters.search) {
    query = query.where(function() {
      this.where('catalogs.catalog_name_en', 'ilike', `%${filters.search}%`)
        .orWhere('catalogs.catalog_name_ch', 'ilike', `%${filters.search}%`);
    });
  }
    
  const data = await query
    .orderBy('catalogs.created_at', 'desc')
    .limit(limit)
    .offset(offset);
    
  let countQuery = db(TABLE_NAME)
    .where({ deleted_at: null });
  
  if (filters.category_id) {
    countQuery = countQuery.where({ category_id: filters.category_id });
  }
  if (filters.catalog_parent_id) {
    countQuery = countQuery.where({ catalog_parent_id: filters.catalog_parent_id });
  }
  if (filters.search) {
    countQuery = countQuery.where(function() {
      this.where('catalog_name_en', 'ilike', `%${filters.search}%`)
        .orWhere('catalog_name_ch', 'ilike', `%${filters.search}%`);
    });
  }
  
  const total = await countQuery.count('catalog_id as count').first();
    
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
 * Find single item by ID
 */
const findById = async (id) => {
  return await db(TABLE_NAME)
    .select(
      'catalogs.*',
      'categories.category_name_en',
      'categories.category_name_ch',
      db.raw('parent.catalog_name_en as parent_catalog_name')
    )
    .leftJoin('categories', function() {
      this.on('catalogs.category_id', '=', 'categories.category_id')
        .andOnNull('categories.deleted_at')
        .andOn('categories.is_delete', '=', db.raw('false'));
    })
    .leftJoin('catalogs as parent', function() {
      this.on('catalogs.catalog_parent_id', '=', 'parent.catalog_id')
        .andOnNull('parent.deleted_at')
        .andOn('parent.is_delete', '=', db.raw('false'));
    })
    .where({ 'catalogs.catalog_id': id, 'catalogs.deleted_at': null })
    .first();
};

/**
 * Find by custom condition
 */
const findOne = async (conditions) => {
  return await db(TABLE_NAME)
    .where({ ...conditions, deleted_at: null })
    .first();
};

/**
 * Create new item
 */
const create = async (data) => {
  const [result] = await db(TABLE_NAME)
    .insert({
      ...data,
      created_at: db.fn.now(),
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Create new item with transaction
 */
const createWithTransaction = async (trx, data) => {
  const [result] = await trx(TABLE_NAME)
    .insert({
      ...data,
      created_at: db.fn.now(),
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Update existing item
 */
const update = async (id, data) => {
  const [result] = await db(TABLE_NAME)
    .where({ catalog_id: id, deleted_at: null })
    .update({
      ...data,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Update existing item with transaction
 */
const updateWithTransaction = async (trx, id, data) => {
  const [result] = await trx(TABLE_NAME)
    .where({ catalog_id: id, deleted_at: null })
    .update({
      ...data,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Soft delete item
 */
const remove = async (id, deletedBy = null) => {
  const [result] = await db(TABLE_NAME)
    .where({ catalog_id: id, deleted_at: null })
    .update({
      deleted_at: db.fn.now(),
      deleted_by: deletedBy,
      is_delete: true
    })
    .returning('*');
  return result;
};

/**
 * Restore soft deleted item
 */
const restore = async (id, updatedBy = null) => {
  const [result] = await db(TABLE_NAME)
    .where({ catalog_id: id })
    .whereNotNull('deleted_at')
    .update({
      deleted_at: null,
      deleted_by: null,
      is_delete: false,
      updated_at: db.fn.now(),
      updated_by: updatedBy
    })
    .returning('*');
  return result;
};

/**
 * Hard delete item (permanent)
 */
const hardDelete = async (id) => {
  return await db(TABLE_NAME)
    .where({ catalog_id: id })
    .del();
};

/**
 * Get child catalogs
 */
const findChildren = async (parentId) => {
  return await db(TABLE_NAME)
    .where({ catalog_parent_id: parentId, deleted_at: null })
    .orderBy('created_at', 'desc');
};

/**
 * Create catalog items with transaction (bulk insert)
 */
const createCatalogItemsWithTransaction = async (trx, items) => {
  if (!items || items.length === 0) {
    return [];
  }
  
  const itemsWithTimestamp = items.map(item => ({
    ...item,
    created_at: db.fn.now(),
    updated_at: db.fn.now()
  }));
  
  const result = await trx('catalog_items')
    .insert(itemsWithTimestamp)
    .returning('*');
  
  return result;
};

/**
 * Soft delete catalog items by catalog_id with transaction
 */
const deleteCatalogItemsByCatalogIdWithTransaction = async (trx, catalogId, deletedBy = null) => {
  const result = await trx('catalog_items')
    .where({ catalog_id: catalogId, deleted_at: null })
    .update({
      deleted_at: db.fn.now(),
      deleted_by: deletedBy,
      is_delete: true
    })
    .returning('*');
  
  return result;
};

/**
 * Upsert catalog items with transaction (update if exists, insert if not)
 * Using PostgreSQL ON CONFLICT for better performance
 */
const upsertCatalogItemsWithTransaction = async (trx, items, employeeId) => {
  if (!items || items.length === 0) {
    return [];
  }
  
  const results = [];
  
  for (const item of items) {
    try {
      // Use PostgreSQL UPSERT (INSERT ... ON CONFLICT ... DO UPDATE)
      const [result] = await trx('catalog_items')
        .insert({
          catalog_id: item.catalog_id,
          target_id: item.target_id,
          diagram_serial_number: item.diagram_serial_number,
          part_number: item.part_number,
          catalog_item_name_en: item.catalog_item_name_en,
          catalog_item_name_ch: item.catalog_item_name_ch,
          catalog_item_quantity: item.catalog_item_quantity,
          catalog_item_description: item.catalog_item_description,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
          created_by: employeeId
        })
        .onConflict(['catalog_id', 'target_id'])
        .merge({
          diagram_serial_number: item.diagram_serial_number,
          part_number: item.part_number,
          catalog_item_name_en: item.catalog_item_name_en,
          catalog_item_name_ch: item.catalog_item_name_ch,
          catalog_item_quantity: item.catalog_item_quantity,
          catalog_item_description: item.catalog_item_description,
          updated_at: db.fn.now(),
          updated_by: employeeId
        })
        .returning('*');
      
      // Check if this was an insert or update by comparing created_at and updated_at
      const isUpdate = result.created_at !== result.updated_at;
      results.push({ ...result, action: isUpdate ? 'updated' : 'inserted' });
      
    } catch (error) {
      console.error('Error upserting catalog item:', error);
      throw error;
    }
  }
  
  return results;
};

module.exports = {
  findAll,
  findById,
  findOne,
  create,
  createWithTransaction,
  update,
  updateWithTransaction,
  remove,
  restore,
  hardDelete,
  findChildren,
  createCatalogItemsWithTransaction,
  deleteCatalogItemsByCatalogIdWithTransaction,
  upsertCatalogItemsWithTransaction
};

