require('dotenv').config();
const db = require('../config/database');
const { replaceExistingUrl } = require('../utils/url-replacer');

/**
 * Script to migrate existing URLs in database to use new S3_BASE_URL
 * This script will update all existing URLs in the database to use the configured S3_BASE_URL
 */

const migrateUrls = async () => {
  console.log('Starting URL migration...');
  console.log('S3_BASE_URL:', process.env.S3_BASE_URL);

  if (!process.env.S3_BASE_URL) {
    console.log('S3_BASE_URL is not configured. Migration skipped.');
    return;
  }

  const tables = [
    {
      table: 'catalogs',
      urlFields: ['catalog_image_url']
    },
    {
      table: 'item_catalog_engines',
      urlFields: ['file_foto_url']
    },
    {
      table: 'item_catalog_cabines',
      urlFields: ['file_foto_url']
    },
    {
      table: 'item_catalog_transmissions',
      urlFields: ['file_foto_url']
    },
    {
      table: 'item_catalog_axles',
      urlFields: ['file_foto_url']
    },
    {
      table: 'item_catalog_steerings',
      urlFields: ['file_foto_url']
    }
  ];

  let totalUpdated = 0;

  for (const tableConfig of tables) {
    console.log(`\nProcessing table: ${tableConfig.table}`);
    
    try {
      for (const field of tableConfig.urlFields) {
        // Get all records with URLs in this field
        const records = await db(tableConfig.table)
          .select('id', field)
          .whereNotNull(field)
          .where(field, '!=', '');

        console.log(`Found ${records.length} records with ${field} in ${tableConfig.table}`);

        let updatedCount = 0;
        for (const record of records) {
          const originalUrl = record[field];
          const newUrl = replaceExistingUrl(originalUrl);

          // Only update if URL actually changed
          if (originalUrl !== newUrl) {
            await db(tableConfig.table)
              .where('id', record.id)
              .update({
                [field]: newUrl,
                updated_at: new Date()
              });

            updatedCount++;
            console.log(`Updated record ${record.id}: ${originalUrl} -> ${newUrl}`);
          }
        }

        console.log(`Updated ${updatedCount} records in ${tableConfig.table}.${field}`);
        totalUpdated += updatedCount;
      }
    } catch (error) {
      console.error(`Error processing table ${tableConfig.table}:`, error.message);
    }
  }

  console.log(`\nMigration completed! Total records updated: ${totalUpdated}`);
};

// Run migration if this file is executed directly
if (require.main === module) {
  migrateUrls()
    .then(() => {
      console.log('Migration finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateUrls };
