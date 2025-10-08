const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'type_cabines';

/**
 * Find all items with pagination and search
 */
const findAll = async (page = 1, limit = 10, filters = {}) => {
  const offset = (page - 1) * limit;
  
  let query = db(TABLE_NAME)
    .select('*')
    .where({ deleted_at: null });

  // Apply search filter if provided
  if (filters.search) {
    query = query.where(function() {
      this.where('type_cabine_name_en', 'ilike', `%${filters.search}%`)
        .orWhere('type_cabine_name_cn', 'ilike', `%${filters.search}%`)
        .orWhere('type_cabine_description', 'ilike', `%${filters.search}%`);
    });
  }

  // Apply sorting
  const sortBy = filters.sort_by || 'created_at';
  const sortOrder = filters.sort_order || 'desc';
  
  const data = await query
    .orderBy(sortBy, sortOrder)
    .limit(limit)
    .offset(offset);
    
  // Count total records for pagination
  let countQuery = db(TABLE_NAME)
    .where({ deleted_at: null });
  
  if (filters.search) {
    countQuery = countQuery.where(function() {
      this.where('type_cabine_name_en', 'ilike', `%${filters.search}%`)
        .orWhere('type_cabine_name_cn', 'ilike', `%${filters.search}%`)
        .orWhere('type_cabine_description', 'ilike', `%${filters.search}%`);
    });
  }
  
  const total = await countQuery.count('type_cabine_id as count').first();
    
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
    .where({ type_cabine_id: id, deleted_at: null })
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
 * Update existing item
 */
const update = async (id, data) => {
  const [result] = await db(TABLE_NAME)
    .where({ type_cabine_id: id, deleted_at: null })
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
const remove = async (id) => {
  const [result] = await db(TABLE_NAME)
    .where({ type_cabine_id: id, deleted_at: null })
    .update({
      deleted_at: db.fn.now(),
      is_delete: true
    })
    .returning('*');
  return result;
};

/**
 * Restore soft deleted item
 */
const restore = async (id) => {
  const [result] = await db(TABLE_NAME)
    .where({ type_cabine_id: id })
    .whereNotNull('deleted_at')
    .update({
      deleted_at: null,
      is_delete: false,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Hard delete item (permanent)
 */
const hardDelete = async (id) => {
  return await db(TABLE_NAME)
    .where({ type_cabine_id: id })
    .del();
};

module.exports = {
  findAll,
  findById,
  findOne,
  create,
  update,
  remove,
  restore,
  hardDelete
};
