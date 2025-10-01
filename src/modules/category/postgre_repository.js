const { pgCore: db } = require('../../config/database');
const { parseSorting, parseSearch } = require('../../utils/standard_query');
const { applyPagination, applySorting, applySearch } = require('../../utils/query_builder');

const TABLE_NAME = 'categories';

/**
 * Find all categories with pagination
 */
const findAll = async (page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'asc', search = '') => {
  const offset = (page - 1) * limit;
  
  // Config untuk sorting dan search
  const allowedSortColumns = ['category_id', 'category_name', 'created_at', 'updated_at'];
  const searchableColumns = ['category_name', 'category_description'];
  
  // Parse sorting dengan validasi
  const sorting = {
    sortBy: allowedSortColumns.includes(sortBy) ? sortBy : 'created_at',
    sortOrder: ['asc', 'desc'].includes(sortOrder?.toLowerCase()) ? sortOrder.toLowerCase() : 'asc'
  };
  
  // Parse search
  const searchParams = {
    searchTerm: search && typeof search === 'string' ? search.trim() : '',
    searchableColumns
  };
  
  // Parse pagination
  const pagination = { limit: parseInt(limit), offset };
  
  // Build query
  let query = db(TABLE_NAME)
    .select('*')
    .where({ is_delete: false });
  
  // Apply search
  query = applySearch(query, searchParams);
  
  // Apply sorting
  query = applySorting(query, sorting);
  
  // Apply pagination
  query = applyPagination(query, pagination);
  
  // Execute query
  const data = await query;
  
  // Build count query
  let countQuery = db(TABLE_NAME)
    .where({ is_delete: false });
  
  // Apply same search filter
  countQuery = applySearch(countQuery, searchParams);
    
  const total = await countQuery
    .count('category_id as count')
    .first();
    
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
 * Find single category by ID
 */
const findById = async (id) => {
  return await db(TABLE_NAME)
    .where({ category_id: id, is_delete: false })
    .first();
};

/**
 * Find by custom condition
 */
const findOne = async (conditions) => {
  return await db(TABLE_NAME)
    .where({ ...conditions, is_delete: false })
    .first();
};

/**
 * Create new category
 */
const create = async (data) => {
  const [result] = await db(TABLE_NAME)
    .insert({
      ...data,
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
      is_delete: false
    })
    .returning('*');
  return result;
};

/**
 * Update existing category
 */
const update = async (id, data) => {
  const [result] = await db(TABLE_NAME)
    .where({ category_id: id, is_delete: false })
    .update({
      ...data,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Soft delete category
 */
const remove = async (id, deletedBy = null) => {
  const [result] = await db(TABLE_NAME)
    .where({ category_id: id, is_delete: false })
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
 * Restore soft deleted category
 */
const restore = async (id, updatedBy = null) => {
  const [result] = await db(TABLE_NAME)
    .where({ category_id: id })
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
 * Hard delete category (permanent)
 */
const hardDelete = async (id) => {
  return await db(TABLE_NAME)
    .where({ category_id: id })
    .del();
};

/**
 * Find all categories (including deleted)
 */
const findAllWithDeleted = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  
  const data = await db(TABLE_NAME)
    .select('*')
    .orderBy('created_at', 'desc')
    .limit(limit)
    .offset(offset);
    
  const total = await db(TABLE_NAME)
    .count('category_id as count')
    .first();
    
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
  findAll,
  findById,
  findOne,
  create,
  update,
  remove,
  restore,
  hardDelete,
  findAllWithDeleted
};
