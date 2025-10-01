const db = require('../../config/database');

const TABLE_NAME = 'categories';

/**
 * Find all categories with pagination
 */
const findAll = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  
  const data = await db(TABLE_NAME)
    .select('*')
    .where({ is_delete: false })
    .orderBy('created_at', 'desc')
    .limit(limit)
    .offset(offset);
    
  const total = await db(TABLE_NAME)
    .where({ is_delete: false })
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
