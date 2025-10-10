const csv = require('csv-parser');
const { Readable } = require('stream');
const fs = require('fs');

/**
 * Helper function to parse CSV file
 */
const parseCsvFile = (buffer) => {
  return new Promise((resolve, reject) => {
    const results = [];
    
    // Create readable stream from buffer
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Signal end of stream
    
    stream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

// Test parsing
const testParse = async () => {
  try {
    // Read CSV file
    const csvPath = '/Users/falaqmsi/Nextcloud/Falaq-BE/template_import_csv_epc.csv';
    const buffer = fs.readFileSync(csvPath);
    
    console.log('=== CSV Buffer Info ===');
    console.log('Buffer length:', buffer.length);
    console.log('Buffer first 100 chars:', buffer.toString('utf-8').substring(0, 100));
    console.log('');
    
    // Parse CSV
    const csvData = await parseCsvFile(buffer);
    
    console.log('=== CSV Parsing Result ===');
    console.log('CSV Data Length:', csvData.length);
    console.log('');
    
    if (csvData.length > 0) {
      console.log('CSV Data Keys:', Object.keys(csvData[0]));
      console.log('');
      console.log('First Row:');
      console.log(JSON.stringify(csvData[0], null, 2));
      console.log('');
      console.log('target_id value:', csvData[0].target_id);
      console.log('target_id type:', typeof csvData[0].target_id);
      console.log('target_id length:', csvData[0].target_id?.length);
    }
    
    // Test mapping
    console.log('=== After Mapping ===');
    const dataItems = csvData.map(row => ({
      target_id: row.target_id || null,
      diagram_serial_number: row.diagram_serial_number || null,
      part_number: row.part_number || null,
      catalog_item_name_en: row.catalog_item_name_en || null,
      catalog_item_name_ch: row.catalog_item_name_ch || null,
      description: row.description || null,
      quantity: row.quantity ? parseInt(row.quantity) : null
    }));
    
    console.log('First mapped item:');
    console.log(JSON.stringify(dataItems[0], null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  }
};

testParse();

