const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'cabines';
const RELATION_TABLE = 'cabines_type_cabines';
const TYPE_CABINES_TABLE = 'type_cabines';

/**
 * Find all items with pagination and search
 */
const findAll = async (page = 1, limit = 10, search = '', sort_by = 'created_at', sort_order = 'desc') => {
  const offset = (page - 1) * limit;
  
  let query = db(TABLE_NAME)
    .select(
      `${TABLE_NAME}.cabines_id`,
      `${TABLE_NAME}.cabines_name_en`,
      `${TABLE_NAME}.cabines_name_cn`,
      `${TABLE_NAME}.cabines_description`,
      `${TABLE_NAME}.created_at`,
      `${TABLE_NAME}.created_by`,
      `${TABLE_NAME}.updated_at`,
      `${TABLE_NAME}.updated_by`,
      `${TABLE_NAME}.deleted_at`,
      `${TABLE_NAME}.deleted_by`,
      `${TABLE_NAME}.is_delete`,
      db.raw(`COALESCE(
        json_agg(
          CASE 
            WHEN ${TYPE_CABINES_TABLE}.type_cabine_id IS NOT NULL 
            THEN json_build_object(
              'type_cabine_id', ${TYPE_CABINES_TABLE}.type_cabine_id,
              'type_cabine_name_en', ${TYPE_CABINES_TABLE}.type_cabine_name_en,
              'type_cabine_name_cn', ${TYPE_CABINES_TABLE}.type_cabine_name_cn,
              'type_cabine_description', ${TYPE_CABINES_TABLE}.type_cabine_description
            )
            ELSE NULL
          END
        ) FILTER (WHERE ${TYPE_CABINES_TABLE}.type_cabine_id IS NOT NULL),
        '[]'::json
      ) as type_cabines`)
    )
    .leftJoin(RELATION_TABLE, `${TABLE_NAME}.cabines_id`, `${RELATION_TABLE}.cabines_id`)
    .leftJoin(TYPE_CABINES_TABLE, `${RELATION_TABLE}.type_cabine_id`, `${TYPE_CABINES_TABLE}.type_cabine_id`)
    .where(`${TABLE_NAME}.deleted_at`, null)
    .where(function() {
      this.where(`${RELATION_TABLE}.deleted_at`, null)
        .orWhereNull(`${RELATION_TABLE}.deleted_at`);
    })
    .groupBy(`${TABLE_NAME}.cabines_id`)
    .orderBy(`${TABLE_NAME}.${sort_by}`, sort_order)
    .limit(limit)
    .offset(offset);

  // Apply search filter if provided
  if (search && search.trim() !== '') {
    query = query.where(function() {
      this.where(`${TABLE_NAME}.cabines_name_en`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.cabines_name_cn`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.cabines_description`, 'ilike', `%${search}%`);
    });
  }

  const data = await query;
    
  const totalQuery = db(TABLE_NAME)
    .count(`${TABLE_NAME}.cabines_id as count`)
    .where(`${TABLE_NAME}.deleted_at`, null);

  if (search && search.trim() !== '') {
    totalQuery.where(function() {
      this.where(`${TABLE_NAME}.cabines_name_en`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.cabines_name_cn`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.cabines_description`, 'ilike', `%${search}%`);
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
 * Find single item by ID with type_cabines
 */
const findById = async (id) => {
  const result = await db(TABLE_NAME)
    .select(
      `${TABLE_NAME}.cabines_id`,
      `${TABLE_NAME}.cabines_name_en`,
      `${TABLE_NAME}.cabines_name_cn`,
      `${TABLE_NAME}.cabines_description`,
      `${TABLE_NAME}.created_at`,
      `${TABLE_NAME}.created_by`,
      `${TABLE_NAME}.updated_at`,
      `${TABLE_NAME}.updated_by`,
      `${TABLE_NAME}.deleted_at`,
      `${TABLE_NAME}.deleted_by`,
      `${TABLE_NAME}.is_delete`,
      db.raw(`COALESCE(
        json_agg(
          CASE 
            WHEN ${TYPE_CABINES_TABLE}.type_cabine_id IS NOT NULL 
            THEN json_build_object(
              'type_cabine_id', ${TYPE_CABINES_TABLE}.type_cabine_id,
              'type_cabine_name_en', ${TYPE_CABINES_TABLE}.type_cabine_name_en,
              'type_cabine_name_cn', ${TYPE_CABINES_TABLE}.type_cabine_name_cn,
              'type_cabine_description', ${TYPE_CABINES_TABLE}.type_cabine_description
            )
            ELSE NULL
          END
        ) FILTER (WHERE ${TYPE_CABINES_TABLE}.type_cabine_id IS NOT NULL),
        '[]'::json
      ) as type_cabines`)
    )
    .leftJoin(RELATION_TABLE, `${TABLE_NAME}.cabines_id`, `${RELATION_TABLE}.cabines_id`)
    .leftJoin(TYPE_CABINES_TABLE, `${RELATION_TABLE}.type_cabine_id`, `${TYPE_CABINES_TABLE}.type_cabine_id`)
    .where(`${TABLE_NAME}.cabines_id`, id)
    .where(`${TABLE_NAME}.deleted_at`, null)
    .where(function() {
      this.where(`${RELATION_TABLE}.deleted_at`, null)
        .orWhereNull(`${RELATION_TABLE}.deleted_at`);
    })
    .groupBy(`${TABLE_NAME}.cabines_id`)
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
 * Create new item with type_cabines
 */
const create = async (data, userId) => {
  const { type_cabines = [], ...cabinesData } = data;
  
  return await db.transaction(async (trx) => {
    // Insert cabines data
    const [cabinesResult] = await trx(TABLE_NAME)
      .insert({
        ...cabinesData,
        created_by: userId,
        updated_by: userId,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      })
      .returning([
        'cabines_id',
        'cabines_name_en',
        'cabines_name_cn',
        'cabines_description',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',
        'deleted_at',
        'deleted_by',
        'is_delete'
      ]);

    // Insert type_cabines data if provided
    if (type_cabines && type_cabines.length > 0) {
      // Create type_cabines records first
      const typeCabinesData = type_cabines.map(typeCabine => ({
        type_cabine_name_en: typeCabine.type_cabine_name_en,
        type_cabine_name_cn: typeCabine.type_cabine_name_cn,
        type_cabine_description: typeCabine.type_cabine_description || null,
        created_by: userId,
        updated_by: userId,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      }));

      const insertedTypeCabines = await trx(TYPE_CABINES_TABLE)
        .insert(typeCabinesData)
        .returning([
          'type_cabine_id',
          'type_cabine_name_en',
          'type_cabine_name_cn',
          'type_cabine_description',
          'created_at',
          'created_by',
          'updated_at',
          'updated_by',
          'deleted_at',
          'deleted_by',
          'is_delete'
        ]);

      // Create relations between cabines and type_cabines
      const relationData = Array.isArray(insertedTypeCabines) 
        ? insertedTypeCabines.map(typeCabine => ({
            cabines_id: cabinesResult.cabines_id,
            type_cabine_id: typeCabine.type_cabine_id,
            created_by: userId,
            updated_by: userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
          }))
        : [{
            cabines_id: cabinesResult.cabines_id,
            type_cabine_id: insertedTypeCabines.type_cabine_id,
            created_by: userId,
            updated_by: userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
          }];

      await trx(RELATION_TABLE).insert(relationData);
    }

    // Return the created cabines with type_cabines
    return cabinesResult;
  });
};

/**
 * Update existing item with type_cabines
 */
const update = async (id, data, userId) => {
  const { type_cabines = [], ...cabinesData } = data;
  
  return await db.transaction(async (trx) => {
    // Update cabines data
    const [cabinesResult] = await trx(TABLE_NAME)
      .where({ cabines_id: id, deleted_at: null })
      .update({
        ...cabinesData,
        updated_by: userId,
        updated_at: db.fn.now()
      })
      .returning([
        'cabines_id',
        'cabines_name_en',
        'cabines_name_cn',
        'cabines_description',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',
        'deleted_at',
        'deleted_by',
        'is_delete'
      ]);

    if (!cabinesResult) {
      return null;
    }

    // Delete existing relations
    await trx(RELATION_TABLE)
      .where({ cabines_id: id })
      .del();

    // Insert new type_cabines data if provided
    if (type_cabines && type_cabines.length > 0) {
      // Create type_cabines records first
      const typeCabinesData = type_cabines.map(typeCabine => ({
        type_cabine_name_en: typeCabine.type_cabine_name_en,
        type_cabine_name_cn: typeCabine.type_cabine_name_cn,
        type_cabine_description: typeCabine.type_cabine_description || null,
        created_by: userId,
        updated_by: userId,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      }));

      const insertedTypeCabines = await trx(TYPE_CABINES_TABLE)
        .insert(typeCabinesData)
        .returning([
          'type_cabine_id',
          'type_cabine_name_en',
          'type_cabine_name_cn',
          'type_cabine_description',
          'created_at',
          'created_by',
          'updated_at',
          'updated_by',
          'deleted_at',
          'deleted_by',
          'is_delete'
        ]);

      // Create relations between cabines and type_cabines
      const relationData = Array.isArray(insertedTypeCabines) 
        ? insertedTypeCabines.map(typeCabine => ({
            cabines_id: id,
            type_cabine_id: typeCabine.type_cabine_id,
            created_by: userId,
            updated_by: userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
          }))
        : [{
            cabines_id: id,
            type_cabine_id: insertedTypeCabines.type_cabine_id,
            created_by: userId,
            updated_by: userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
          }];

      await trx(RELATION_TABLE).insert(relationData);
    }

    // Return the updated cabines with type_cabines
    return await findById(id);
  });
};

/**
 * Soft delete item
 */
const remove = async (id, userId) => {
  return await db.transaction(async (trx) => {
    // Soft delete cabines
    const [cabinesResult] = await trx(TABLE_NAME)
      .where({ cabines_id: id, deleted_at: null })
      .update({
        deleted_at: db.fn.now(),
        deleted_by: userId,
        updated_at: db.fn.now(),
        updated_by: userId
      })
      .returning([
        'cabines_id',
        'cabines_name_en',
        'cabines_name_cn',
        'cabines_description',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',
        'deleted_at',
        'deleted_by',
        'is_delete'
      ]);

    // Soft delete relations
    await trx(RELATION_TABLE)
      .where({ cabines_id: id })
      .update({
        deleted_at: db.fn.now(),
        deleted_by: userId,
        updated_at: db.fn.now(),
        updated_by: userId
      });

    return cabinesResult;
  });
};

/**
 * Restore soft deleted item
 */
const restore = async (id, userId) => {
  return await db.transaction(async (trx) => {
    // Restore cabines
    const [cabinesResult] = await trx(TABLE_NAME)
      .where({ cabines_id: id })
      .whereNotNull('deleted_at')
      .update({
        deleted_at: null,
        deleted_by: null,
        updated_at: db.fn.now(),
        updated_by: userId
      })
      .returning([
        'cabines_id',
        'cabines_name_en',
        'cabines_name_cn',
        'cabines_description',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',
        'deleted_at',
        'deleted_by',
        'is_delete'
      ]);

    // Restore relations
    await trx(RELATION_TABLE)
      .where({ cabines_id: id })
      .update({
        deleted_at: null,
        deleted_by: null,
        updated_at: db.fn.now(),
        updated_by: userId
      });

    return cabinesResult;
  });
};

/**
 * Hard delete item (permanent)
 */
const hardDelete = async (id) => {
  return await db.transaction(async (trx) => {
    // Delete relations first
    await trx(RELATION_TABLE)
      .where({ cabines_id: id })
      .del();

    // Delete cabines
    return await trx(TABLE_NAME)
      .where({ cabines_id: id })
      .del();
  });
};

/**
 * Get all type_cabines for dropdown/selection
 */
const getAllTypeCabines = async () => {
  return await db(TYPE_CABINES_TABLE)
    .select('type_cabine_id', 'type_cabine_name_en', 'type_cabine_name_cn', 'type_cabine_description')
    .where({ deleted_at: null })
    .orderBy('type_cabine_name_en', 'asc');
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
  getAllTypeCabines
};
