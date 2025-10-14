const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'steerings';
const RELATION_TABLE = 'steerings_type_steerings';
const TYPE_STEERINGS_TABLE = 'type_steerings';

/**
 * Find all items with pagination and search
 */
const findAll = async (page = 1, limit = 10, search = '', sort_by = 'created_at', sort_order = 'desc') => {
  const offset = (page - 1) * limit;
  
  let query = db(TABLE_NAME)
    .select(
      `${TABLE_NAME}.steering_id`,
      `${TABLE_NAME}.steering_name_en`,
      `${TABLE_NAME}.steering_name_cn`,
      `${TABLE_NAME}.steering_description`,
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
            WHEN ${TYPE_STEERINGS_TABLE}.type_steering_id IS NOT NULL 
            THEN json_build_object(
              'type_steering_id', ${TYPE_STEERINGS_TABLE}.type_steering_id,
              'type_steering_name_en', ${TYPE_STEERINGS_TABLE}.type_steering_name_en,
              'type_steering_name_cn', ${TYPE_STEERINGS_TABLE}.type_steering_name_cn,
              'type_steering_description', ${TYPE_STEERINGS_TABLE}.type_steering_description
            )
            ELSE NULL
          END
        ) FILTER (WHERE ${TYPE_STEERINGS_TABLE}.type_steering_id IS NOT NULL),
        '[]'::json
      ) as type_steerings`)
    )
    .leftJoin(RELATION_TABLE, `${TABLE_NAME}.steering_id`, `${RELATION_TABLE}.steering_id`)
    .leftJoin(TYPE_STEERINGS_TABLE, `${RELATION_TABLE}.type_steering_id`, `${TYPE_STEERINGS_TABLE}.type_steering_id`)
    .where(`${TABLE_NAME}.deleted_at`, null)
    .where(function() {
      this.where(`${RELATION_TABLE}.deleted_at`, null)
        .orWhereNull(`${RELATION_TABLE}.deleted_at`);
    })
    .groupBy(
      `${TABLE_NAME}.steering_id`,
      `${TABLE_NAME}.steering_name_en`,
      `${TABLE_NAME}.steering_name_cn`,
      `${TABLE_NAME}.steering_description`,
      `${TABLE_NAME}.created_at`,
      `${TABLE_NAME}.created_by`,
      `${TABLE_NAME}.updated_at`,
      `${TABLE_NAME}.updated_by`,
      `${TABLE_NAME}.deleted_at`,
      `${TABLE_NAME}.deleted_by`,
      `${TABLE_NAME}.is_delete`
    )
    .orderBy(`${TABLE_NAME}.${sort_by}`, sort_order)
    .limit(limit)
    .offset(offset);

  // Apply search filter if provided
  if (search && search.trim() !== '') {
    query = query.where(function() {
      this.where(`${TABLE_NAME}.steering_name_en`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.steering_name_cn`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.steering_description`, 'ilike', `%${search}%`);
    });
  }

  const data = await query;
    
  const totalQuery = db(TABLE_NAME)
    .count(`${TABLE_NAME}.steering_id as count`)
    .where(`${TABLE_NAME}.deleted_at`, null);

  if (search && search.trim() !== '') {
    totalQuery.where(function() {
      this.where(`${TABLE_NAME}.steering_name_en`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.steering_name_cn`, 'ilike', `%${search}%`)
        .orWhere(`${TABLE_NAME}.steering_description`, 'ilike', `%${search}%`);
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
 * Find single item by ID with type_steerings
 */
const findById = async (id) => {
  const result = await db(TABLE_NAME)
    .select(
      `${TABLE_NAME}.steering_id`,
      `${TABLE_NAME}.steering_name_en`,
      `${TABLE_NAME}.steering_name_cn`,
      `${TABLE_NAME}.steering_description`,
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
            WHEN ${TYPE_STEERINGS_TABLE}.type_steering_id IS NOT NULL 
            THEN json_build_object(
              'type_steering_id', ${TYPE_STEERINGS_TABLE}.type_steering_id,
              'type_steering_name_en', ${TYPE_STEERINGS_TABLE}.type_steering_name_en,
              'type_steering_name_cn', ${TYPE_STEERINGS_TABLE}.type_steering_name_cn,
              'type_steering_description', ${TYPE_STEERINGS_TABLE}.type_steering_description
            )
            ELSE NULL
          END
        ) FILTER (WHERE ${TYPE_STEERINGS_TABLE}.type_steering_id IS NOT NULL),
        '[]'::json
      ) as type_steerings`)
    )
    .leftJoin(RELATION_TABLE, `${TABLE_NAME}.steering_id`, `${RELATION_TABLE}.steering_id`)
    .leftJoin(TYPE_STEERINGS_TABLE, `${RELATION_TABLE}.type_steering_id`, `${TYPE_STEERINGS_TABLE}.type_steering_id`)
    .where(`${TABLE_NAME}.steering_id`, id)
    .where(`${TABLE_NAME}.deleted_at`, null)
    .where(function() {
      this.where(`${RELATION_TABLE}.deleted_at`, null)
        .orWhereNull(`${RELATION_TABLE}.deleted_at`);
    })
    .groupBy(
      `${TABLE_NAME}.steering_id`,
      `${TABLE_NAME}.steering_name_en`,
      `${TABLE_NAME}.steering_name_cn`,
      `${TABLE_NAME}.steering_description`,
      `${TABLE_NAME}.created_at`,
      `${TABLE_NAME}.created_by`,
      `${TABLE_NAME}.updated_at`,
      `${TABLE_NAME}.updated_by`,
      `${TABLE_NAME}.deleted_at`,
      `${TABLE_NAME}.deleted_by`,
      `${TABLE_NAME}.is_delete`
    )
    .first();

  return result;
};

/**
 * Find by custom condition
 */
const findOne = async (conditions) => {
  return await db(TABLE_NAME)
    .select(
      'steering_id',
      'steering_name_en',
      'steering_name_cn',
      'steering_description',
      'created_at',
      'created_by',
      'updated_at',
      'updated_by',
      'deleted_at',
      'deleted_by',
      'is_delete'
    )
    .where({ ...conditions, deleted_at: null })
    .first();
};

/**
 * Create new item with type_steerings
 */
const create = async (data, userId) => {
  const { type_steerings = [], ...steeringData } = data;
  
  return await db.transaction(async (trx) => {
    // Insert steering data
    const [steeringResult] = await trx(TABLE_NAME)
      .insert({
        ...steeringData,
        created_by: userId,
        updated_by: userId,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      })
      .returning([
        'steering_id',
        'steering_name_en',
        'steering_name_cn',
        'steering_description',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',
        'deleted_at',
        'deleted_by',
        'is_delete'
      ]);

    // Insert type_steerings data if provided
    if (type_steerings && type_steerings.length > 0) {
      // Create type_steerings records first
      const typeSteeringsData = type_steerings.map(typeSteering => ({
        type_steering_name_en: typeSteering.type_steering_name_en,
        type_steering_name_cn: typeSteering.type_steering_name_cn,
        type_steering_description: typeSteering.type_steering_description || null,
        created_by: userId,
        updated_by: userId,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      }));

      const insertedTypeSteerings = await trx(TYPE_STEERINGS_TABLE)
        .insert(typeSteeringsData)
        .returning([
          'type_steering_id',
          'type_steering_name_en',
          'type_steering_name_cn',
          'type_steering_description',
          'created_at',
          'created_by',
          'updated_at',
          'updated_by',
          'deleted_at',
          'deleted_by',
          'is_delete'
        ]);

      // Create relations between steering and type_steerings
      const relationData = Array.isArray(insertedTypeSteerings) 
        ? insertedTypeSteerings.map(typeSteering => ({
            steering_id: steeringResult.steering_id,
            type_steering_id: typeSteering.type_steering_id,
            created_by: userId,
            updated_by: userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
          }))
        : [{
            steering_id: steeringResult.steering_id,
            type_steering_id: insertedTypeSteerings.type_steering_id,
            created_by: userId,
            updated_by: userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
          }];

      await trx(RELATION_TABLE).insert(relationData);
    }

    // Return the created steering with type_steerings
    return steeringResult;
  });
};

/**
 * Update existing item with type_steerings
 */
const update = async (id, data, userId) => {
  const { type_steerings = [], ...steeringData } = data;
  
  return await db.transaction(async (trx) => {
    // Update steering data
    const [steeringResult] = await trx(TABLE_NAME)
      .where({ steering_id: id, deleted_at: null })
      .update({
        ...steeringData,
        updated_by: userId,
        updated_at: db.fn.now()
      })
      .returning([
        'steering_id',
        'steering_name_en',
        'steering_name_cn',
        'steering_description',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',
        'deleted_at',
        'deleted_by',
        'is_delete'
      ]);

    if (!steeringResult) {
      return null;
    }

    // Delete existing relations
    await trx(RELATION_TABLE)
      .where({ steering_id: id })
      .del();

    // Insert new type_steerings data if provided
    if (type_steerings && type_steerings.length > 0) {
      // Create type_steerings records first
      const typeSteeringsData = type_steerings.map(typeSteering => ({
        type_steering_name_en: typeSteering.type_steering_name_en,
        type_steering_name_cn: typeSteering.type_steering_name_cn,
        type_steering_description: typeSteering.type_steering_description || null,
        created_by: userId,
        updated_by: userId,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      }));

      const insertedTypeSteerings = await trx(TYPE_STEERINGS_TABLE)
        .insert(typeSteeringsData)
        .returning([
          'type_steering_id',
          'type_steering_name_en',
          'type_steering_name_cn',
          'type_steering_description',
          'created_at',
          'created_by',
          'updated_at',
          'updated_by',
          'deleted_at',
          'deleted_by',
          'is_delete'
        ]);

      // Create relations between steering and type_steerings
      const relationData = Array.isArray(insertedTypeSteerings) 
        ? insertedTypeSteerings.map(typeSteering => ({
            steering_id: id,
            type_steering_id: typeSteering.type_steering_id,
            created_by: userId,
            updated_by: userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
          }))
        : [{
            steering_id: id,
            type_steering_id: insertedTypeSteerings.type_steering_id,
            created_by: userId,
            updated_by: userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
          }];

      await trx(RELATION_TABLE).insert(relationData);
    }

    // Return the updated steering with type_steerings
    return await findById(id);
  });
};

/**
 * Soft delete item
 */
const remove = async (id, userId) => {
  return await db.transaction(async (trx) => {
    // Soft delete steering
    const [steeringResult] = await trx(TABLE_NAME)
      .where({ steering_id: id, deleted_at: null })
      .update({
        deleted_at: db.fn.now(),
        deleted_by: userId,
        updated_at: db.fn.now(),
        updated_by: userId
      })
      .returning([
        'steering_id',
        'steering_name_en',
        'steering_name_cn',
        'steering_description',
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
      .where({ steering_id: id })
      .update({
        deleted_at: db.fn.now(),
        deleted_by: userId,
        updated_at: db.fn.now(),
        updated_by: userId
      });

    return steeringResult;
  });
};

/**
 * Restore soft deleted item
 */
const restore = async (id, userId) => {
  return await db.transaction(async (trx) => {
    // Restore steering
    const [steeringResult] = await trx(TABLE_NAME)
      .where({ steering_id: id })
      .whereNotNull('deleted_at')
      .update({
        deleted_at: null,
        deleted_by: null,
        updated_at: db.fn.now(),
        updated_by: userId
      })
      .returning([
        'steering_id',
        'steering_name_en',
        'steering_name_cn',
        'steering_description',
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
      .where({ steering_id: id })
      .update({
        deleted_at: null,
        deleted_by: null,
        updated_at: db.fn.now(),
        updated_by: userId
      });

    return steeringResult;
  });
};

/**
 * Hard delete item (permanent)
 */
const hardDelete = async (id) => {
  return await db.transaction(async (trx) => {
    // Delete relations first
    await trx(RELATION_TABLE)
      .where({ steering_id: id })
      .del();

    // Delete steering
    return await trx(TABLE_NAME)
      .where({ steering_id: id })
      .del();
  });
};

/**
 * Get all type_steerings for dropdown/selection
 */
const getAllTypeSteerings = async () => {
  return await db(TYPE_STEERINGS_TABLE)
    .select('type_steering_id', 'type_steering_name_en', 'type_steering_name_cn', 'type_steering_description')
    .where({ deleted_at: null })
    .orderBy('type_steering_name_en', 'asc');
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
  getAllTypeSteerings
};

