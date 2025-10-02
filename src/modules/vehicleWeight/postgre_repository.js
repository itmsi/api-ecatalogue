const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'vehicle_weights';

/**
 * Find all items with pagination and filters
 */
const findAll = async (page = 1, limit = 10, filters = {}) => {
  const offset = (page - 1) * limit;
  
  let query = db(TABLE_NAME)
    .select('*')
    .where({ deleted_at: null, is_delete: false })
    .orderBy(filters.sort_by || 'created_at', filters.sort_order || 'desc')
    .limit(limit)
    .offset(offset);
  
  // Apply search filter
  if (filters.search && filters.search.trim() !== '') {
    const searchTerm = `%${filters.search.trim()}%`;
    query = query.where(function() {
      this.where('vehicle_weight_code', 'ilike', searchTerm)
        .orWhere('vehicle_weight_name', 'ilike', searchTerm)
        .orWhere('vehicle_weight_description', 'ilike', searchTerm);
    });
  }
  
  const data = await query;
  
  // Get total count for pagination
  let countQuery = db(TABLE_NAME)
    .where({ deleted_at: null, is_delete: false });
    
  if (filters.search && filters.search.trim() !== '') {
    const searchTerm = `%${filters.search.trim()}%`;
    countQuery = countQuery.where(function() {
      this.where('vehicle_weight_code', 'ilike', searchTerm)
        .orWhere('vehicle_weight_name', 'ilike', searchTerm)
        .orWhere('vehicle_weight_description', 'ilike', searchTerm);
    });
  }
  
  const total = await countQuery.count('vehicle_weight_id as count').first();
    
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
    .where({ vehicle_weight_id: id, deleted_at: null, is_delete: false })
    .first();
};

/**
 * Find by custom condition
 */
const findOne = async (conditions) => {
  return await db(TABLE_NAME)
    .where({ ...conditions, deleted_at: null, is_delete: false })
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
    .where({ vehicle_weight_id: id, deleted_at: null, is_delete: false })
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
    .where({ vehicle_weight_id: id, deleted_at: null, is_delete: false })
    .update({
      deleted_at: db.fn.now(),
      deleted_by: deletedBy,
      is_delete: true,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Restore soft deleted item
 */
const restore = async (id, updatedBy = null) => {
  const [result] = await db(TABLE_NAME)
    .where({ vehicle_weight_id: id })
    .whereNotNull('deleted_at')
    .where('is_delete', true)
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
    .where({ vehicle_weight_id: id })
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
