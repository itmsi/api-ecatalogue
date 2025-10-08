const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'axels';
const RELATION_TABLE = 'axels_type_axels';
const TYPE_AXELS_TABLE = 'type_axels';

/**
 * Find all items with pagination and search
 */
const findAll = async (page = 1, limit = 10, search = '', sort_by = 'created_at', sort_order = 'desc') => {
  const offset = (page - 1) * limit;
  
  let query = db(TABLE_NAME)
    .select(
      `${TABLE_NAME}.*`,
      db.raw(`json_agg(
        CASE 
          WHEN ${TYPE_AXELS_TABLE}.type_axel_id IS NOT NULL 
          THEN json_build_object(
            'type_axel_id', ${TYPE_AXELS_TABLE}.type_axel_id,
            'type_axel_name_en', ${TYPE_AXELS_TABLE}.type_axel_name_en,
            'type_axel_name_cn', ${TYPE_AXELS_TABLE}.type_axel_name_cn,
            'type_axel_description', ${TYPE_AXELS_TABLE}.type_axel_description
          )
          ELSE NULL
        END
      ) FILTER (WHERE ${TYPE_AXELS_TABLE}.type_axel_id IS NOT NULL) as type_axels`)
    )
    .leftJoin(RELATION_TABLE, `${TABLE_NAME}.axel_id`, `${RELATION_TABLE}.axel_id`)
    .leftJoin(TYPE_AXELS_TABLE, `${RELATION_TABLE}.type_axel_id`, `${TYPE_AXELS_TABLE}.type_axel_id`)
    .where(`${TABLE_NAME}.deleted_at`, null)
    .where(function() {
      this.where(`${RELATION_TABLE}.deleted_at`, null)
        .orWhereNull(`${RELATION_TABLE}.deleted_at`);
    })
    .groupBy(`${TABLE_NAME}.axel_id`)
    .orderBy(`${TABLE_NAME}.${sort_by}`, sort_order)
    .limit(limit)
    .offset(offset);

  // Apply search filter if provided
  if (search && search.trim() !== '') {
    query = query.where(function() {
      this.where(`${TABLE_NAME}.axel_name_en`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.axel_name_cn`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.axel_description`, 'ilike', `%${search}%`);
    });
  }

  const data = await query;
    
  const totalQuery = db(TABLE_NAME)
    .count(`${TABLE_NAME}.axel_id as count`)
    .where(`${TABLE_NAME}.deleted_at`, null);

  if (search && search.trim() !== '') {
    totalQuery.where(function() {
      this.where(`${TABLE_NAME}.axel_name_en`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.axel_name_cn`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.axel_description`, 'ilike', `%${search}%`);
    });
  }

  const total = await totalQuery.first();
    
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
 * Find single item by ID with type_axels
 */
const findById = async (id) => {
  const result = await db(TABLE_NAME)
    .select(
      `${TABLE_NAME}.*`,
      db.raw(`json_agg(
        CASE 
          WHEN ${TYPE_AXELS_TABLE}.type_axel_id IS NOT NULL 
          THEN json_build_object(
            'type_axel_id', ${TYPE_AXELS_TABLE}.type_axel_id,
            'type_axel_name_en', ${TYPE_AXELS_TABLE}.type_axel_name_en,
            'type_axel_name_cn', ${TYPE_AXELS_TABLE}.type_axel_name_cn,
            'type_axel_description', ${TYPE_AXELS_TABLE}.type_axel_description
          )
          ELSE NULL
        END
      ) FILTER (WHERE ${TYPE_AXELS_TABLE}.type_axel_id IS NOT NULL) as type_axels`)
    )
    .leftJoin(RELATION_TABLE, `${TABLE_NAME}.axel_id`, `${RELATION_TABLE}.axel_id`)
    .leftJoin(TYPE_AXELS_TABLE, `${RELATION_TABLE}.type_axel_id`, `${TYPE_AXELS_TABLE}.type_axel_id`)
    .where(`${TABLE_NAME}.axel_id`, id)
    .where(`${TABLE_NAME}.deleted_at`, null)
    .where(function() {
      this.where(`${RELATION_TABLE}.deleted_at`, null)
        .orWhereNull(`${RELATION_TABLE}.deleted_at`);
    })
    .groupBy(`${TABLE_NAME}.axel_id`)
    .first();

  return result;
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
 * Create new item with type_axels
 */
const create = async (data, userId) => {
  const { type_axels = [], ...axelData } = data;
  
  return await db.transaction(async (trx) => {
    // Insert axel data
    const [axelResult] = await trx(TABLE_NAME)
      .insert({
        ...axelData,
        created_by: userId,
        updated_by: userId,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      })
      .returning('*');

    // Insert type_axels data if provided
    if (type_axels && type_axels.length > 0) {
      // Create type_axels records first
      const typeAxelsData = type_axels.map(typeAxel => ({
        type_axel_name_en: typeAxel.type_axel_name_en,
        type_axel_name_cn: typeAxel.type_axel_name_cn,
        type_axel_description: typeAxel.type_axel_description || null,
        created_by: userId,
        updated_by: userId,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      }));

      const insertedTypeAxels = await trx(TYPE_AXELS_TABLE)
        .insert(typeAxelsData)
        .returning('*');

      // Create relations between axels and type_axels
      const relationData = Array.isArray(insertedTypeAxels) 
        ? insertedTypeAxels.map(typeAxel => ({
            axel_id: axelResult.axel_id,
            type_axel_id: typeAxel.type_axel_id,
            created_by: userId,
            updated_by: userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
          }))
        : [{
            axel_id: axelResult.axel_id,
            type_axel_id: insertedTypeAxels.type_axel_id,
            created_by: userId,
            updated_by: userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
          }];

      await trx(RELATION_TABLE).insert(relationData);
    }

    // Return the created axel with type_axels
    return await findById(axelResult.axel_id);
  });
};

/**
 * Update existing item with type_axels
 */
const update = async (id, data, userId) => {
  const { type_axels = [], ...axelData } = data;
  
  return await db.transaction(async (trx) => {
    // Update axel data
    const [axelResult] = await trx(TABLE_NAME)
      .where({ axel_id: id, deleted_at: null })
      .update({
        ...axelData,
        updated_by: userId,
        updated_at: db.fn.now()
      })
      .returning('*');

    if (!axelResult) {
      return null;
    }

    // Delete existing relations
    await trx(RELATION_TABLE)
      .where({ axel_id: id })
      .del();

    // Insert new type_axels data if provided
    if (type_axels && type_axels.length > 0) {
      // Create type_axels records first
      const typeAxelsData = type_axels.map(typeAxel => ({
        type_axel_name_en: typeAxel.type_axel_name_en,
        type_axel_name_cn: typeAxel.type_axel_name_cn,
        type_axel_description: typeAxel.type_axel_description || null,
        created_by: userId,
        updated_by: userId,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      }));

      const insertedTypeAxels = await trx(TYPE_AXELS_TABLE)
        .insert(typeAxelsData)
        .returning('*');

      // Create relations between axels and type_axels
      const relationData = Array.isArray(insertedTypeAxels) 
        ? insertedTypeAxels.map(typeAxel => ({
            axel_id: id,
            type_axel_id: typeAxel.type_axel_id,
            created_by: userId,
            updated_by: userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
          }))
        : [{
            axel_id: id,
            type_axel_id: insertedTypeAxels.type_axel_id,
            created_by: userId,
            updated_by: userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
          }];

      await trx(RELATION_TABLE).insert(relationData);
    }

    // Return the updated axel with type_axels
    return await findById(id);
  });
};

/**
 * Soft delete item
 */
const remove = async (id, userId) => {
  return await db.transaction(async (trx) => {
    // Soft delete axel
    const [axelResult] = await trx(TABLE_NAME)
      .where({ axel_id: id, deleted_at: null })
      .update({
        deleted_at: db.fn.now(),
        deleted_by: userId,
        updated_at: db.fn.now(),
        updated_by: userId,
        is_delete: true
      })
      .returning('*');

    // Soft delete relations
    await trx(RELATION_TABLE)
      .where({ axel_id: id })
      .update({
        deleted_at: db.fn.now(),
        deleted_by: userId,
        updated_at: db.fn.now(),
        updated_by: userId,
        is_delete: true
      });

    return axelResult;
  });
};

/**
 * Restore soft deleted item
 */
const restore = async (id, userId) => {
  return await db.transaction(async (trx) => {
    // Restore axel
    const [axelResult] = await trx(TABLE_NAME)
      .where({ axel_id: id })
      .whereNotNull('deleted_at')
      .update({
        deleted_at: null,
        deleted_by: null,
        updated_at: db.fn.now(),
        updated_by: userId,
        is_delete: false
      })
      .returning('*');

    // Restore relations
    await trx(RELATION_TABLE)
      .where({ axel_id: id })
      .update({
        deleted_at: null,
        deleted_by: null,
        updated_at: db.fn.now(),
        updated_by: userId,
        is_delete: false
      });

    return axelResult;
  });
};

/**
 * Hard delete item (permanent)
 */
const hardDelete = async (id) => {
  return await db.transaction(async (trx) => {
    // Delete relations first
    await trx(RELATION_TABLE)
      .where({ axel_id: id })
      .del();

    // Delete axel
    return await trx(TABLE_NAME)
      .where({ axel_id: id })
      .del();
  });
};

/**
 * Get all type_axels for dropdown/selection
 */
const getAllTypeAxels = async () => {
  return await db(TYPE_AXELS_TABLE)
    .select('type_axel_id', 'type_axel_name_en', 'type_axel_name_cn', 'type_axel_description')
    .where({ deleted_at: null })
    .orderBy('type_axel_name_en', 'asc');
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
  getAllTypeAxels
};

