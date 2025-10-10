/**
 * Seeder: Example data
 * This is an example seeder file
 */

exports.seed = async function(knex) {
  // Delete all existing entries (optional)
  await knex('examples').del();
  
  // Insert seed data
  await knex('examples').insert([
    {
      id: knex.raw('uuid_generate_v4()'),
      name: 'Example 1',
      description: 'This is the first example item',
      status: 'active',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      name: 'Example 2',
      description: 'This is the second example item',
      status: 'active',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      name: 'Example 3',
      description: 'This is the third example item',
      status: 'inactive',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      name: 'Example 4',
      description: 'This is the fourth example item for testing',
      status: 'active',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      name: 'Example 5',
      description: 'This is the fifth example item with pending status',
      status: 'pending',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      name: 'Example 6',
      description: 'This is the sixth example item for validation',
      status: 'active',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      name: 'Example 7',
      description: 'This is the seventh example item in draft mode',
      status: 'draft',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      name: 'Example 8',
      description: 'This is the eighth example item for development',
      status: 'active',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      name: 'Example 9',
      description: 'This is the ninth example item with archived status',
      status: 'archived',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      name: 'Example 10',
      description: 'This is the tenth example item for production testing',
      status: 'active',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
};

