const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');

/**
 * Get sidebars with hierarchical structure
 */
const getSidebars = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      sort_by = 'created_at',
      sort_order = 'desc',
      vin_number = 'null'
    } = req.body;

    // Convert vin_number from string 'null' to actual null
    const vinFilter = vin_number === 'null' || vin_number === null ? null : vin_number;

    const filters = {
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      sort_by,
      sort_order,
      vin_number: vinFilter
    };

    const data = await repository.getSidebars(filters);
    
    return baseResponse(res, { 
      data: data.items,
      pagination: data.pagination
    });
  } catch (error) {
    console.error('Error in getSidebars:', error);
    return errorResponse(res, error);
  }
};

module.exports = {
  getSidebars
};
