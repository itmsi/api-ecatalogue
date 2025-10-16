require('dotenv').config();

const Minio = require('minio');
const http = require('http');
const https = require('https');

// Create custom agents with timeout (aggressively increased for server environment)
const httpAgent = new http.Agent({
  timeout: 120000, // 2 minutes timeout for server environment
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 50,
  maxFreeSockets: 10
});

const httpsAgent = new https.Agent({
  timeout: 120000, // 2 minutes timeout for server environment
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 50,
  maxFreeSockets: 10,
  rejectUnauthorized: false // Allow self-signed certificates
});

// Check if MinIO is enabled
const isMinioEnabled = process.env.S3_PROVIDER === 'minio';

// Function to replace base URL if S3_BASE_URL is configured
const replaceBaseUrl = (originalUrl) => {
  // If S3_BASE_URL is not configured, return original URL
  if (!process.env.S3_BASE_URL) {
    return originalUrl;
  }

  try {
    const url = new URL(originalUrl);
    const baseUrl = new URL(process.env.S3_BASE_URL);
    
    // Replace the protocol, hostname, and port with the base URL
    const newUrl = `${baseUrl.protocol}//${baseUrl.hostname}${baseUrl.port ? `:${baseUrl.port}` : ''}${url.pathname}`;
    
    console.log('URL replacement:', {
      original: originalUrl,
      new: newUrl,
      baseUrl: process.env.S3_BASE_URL
    });
    
    return newUrl;
  } catch (error) {
    console.warn('Error replacing base URL, returning original:', error.message);
    return originalUrl;
  }
};

// Initialize MinIO client only if enabled
let minioClient = null;
let minioClientPrivate = null;

if (isMinioEnabled) {
  // Parse endpoint URL
  const endpointUrl = new URL(process.env.S3_ENDPOINT);
  const useSSL = endpointUrl.protocol === 'https:';
  
  // Initialize MinIO client with timeout configuration
  minioClient = new Minio.Client({
    endPoint: endpointUrl.hostname,
    port: endpointUrl.port ? parseInt(endpointUrl.port) : (useSSL ? 443 : 80),
    useSSL: useSSL,
    accessKey: process.env.S3_ACCESS_KEY_ID,
    secretKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
    s3ForcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
    signatureVersion: process.env.S3_SIGNATURE_VERSION,
    // Add timeout configuration
    httpAgent: httpAgent,
    httpsAgent: httpsAgent
  });

  minioClientPrivate = new Minio.Client({
    endPoint: endpointUrl.hostname,
    port: endpointUrl.port ? parseInt(endpointUrl.port) : (useSSL ? 443 : 80),
    useSSL: useSSL,
    accessKey: process.env.S3_ACCESS_KEY_ID,
    secretKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
    s3ForcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
    signatureVersion: process.env.S3_SIGNATURE_VERSION,
    // Add timeout configuration
    httpAgent: httpAgent,
    httpsAgent: httpsAgent
  });
}

// Connection test function
const testMinioConnection = async (client, maxRetries = 3, skipTest = false) => {
  // Skip connection test if explicitly requested or if SKIP_MINIO_CONNECTION_TEST is set
  // Also skip if NODE_ENV is production (server environment)
  if (skipTest || process.env.SKIP_MINIO_CONNECTION_TEST === 'true' || process.env.NODE_ENV === 'production') {
    console.log('Skipping MinIO connection test (production environment or explicitly disabled)');
    return true;
  }

  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`Testing MinIO connection (attempt ${i + 1}/${maxRetries})`);
      
      // Try to list buckets as a connection test with longer timeout
      await Promise.race([
        client.listBuckets(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Connection test timeout')), 60000)) // Increased to 60 seconds for server
      ]);
      
      console.log('MinIO connection test successful');
      return true;
    } catch (error) {
      console.warn(`MinIO connection test attempt ${i + 1} failed:`, error.message);
      if (i === maxRetries - 1) {
        console.error('All MinIO connection tests failed');
        console.warn('Consider setting SKIP_MINIO_CONNECTION_TEST=true if MinIO server is known to be working');
        return false;
      }
      // Wait before retry with increasing delay
      const delay = 2000 + (i * 1000); // 2s, 3s, 4s
      console.log(`Retrying connection test in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return false;
};

// Upload file to MinIO
const uploadToMinio = async (objectName, buffer, contentType = 'application/octet-stream', bucketName = null) => {
  if (!isMinioEnabled) {
    console.log('MinIO is disabled');
    return { success: false, url: '' };
  }

  const bucket = bucketName || process.env.S3_BUCKET;
  
  // Debug logging
  console.log('=== MinIO Upload Debug Info ===');
  console.log('Endpoint:', process.env.S3_ENDPOINT);
  console.log('Bucket:', bucket);
  console.log('Object Name:', objectName);
  console.log('Content Type:', contentType);
  console.log('Buffer Size:', buffer.length);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('SKIP_MINIO_CONNECTION_TEST:', process.env.SKIP_MINIO_CONNECTION_TEST);
  console.log('===============================');

  try {
    // Test connection first, but allow fallback if connection test fails
    let connectionOk = await testMinioConnection(minioClient);
    
    if (!connectionOk) {
      console.warn('Connection test failed, attempting to skip connection test and proceed with upload...');
      // Try again with connection test skipped
      connectionOk = await testMinioConnection(minioClient, 1, true);
      
      if (!connectionOk) {
        throw new Error('MinIO connection test failed and fallback also failed');
      }
    }

    // Check if bucket exists, if not create it
    let bucketExists = false;
    try {
      bucketExists = await Promise.race([
        minioClient.bucketExists(bucket),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Bucket check timeout')), 90000)) // Increased to 90 seconds for server
      ]);
    } catch (bucketCheckError) {
      console.warn('Bucket check failed, assuming bucket does not exist:', bucketCheckError.message);
      bucketExists = false;
    }
    
    if (!bucketExists) {
      try {
        await Promise.race([
          minioClient.makeBucket(bucket, process.env.S3_REGION || 'us-east-1'),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Bucket creation timeout')), 90000)) // Increased to 90 seconds for server
        ]);
        console.log(`Bucket '${bucket}' created successfully.`);
      } catch (bucketCreateError) {
        console.warn('Bucket creation failed, continuing with upload:', bucketCreateError.message);
        // Continue with upload even if bucket creation fails
      }
    }

    // Set bucket policy untuk public read (selalu set, tidak peduli bucket baru atau lama)
    const bucketPolicy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${bucket}/*`]
        }
      ]
    };

    try {
      await Promise.race([
        minioClient.setBucketPolicy(bucket, JSON.stringify(bucketPolicy)),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Policy set timeout')), 90000)) // Increased to 90 seconds for server
      ]);
      console.log(`Bucket policy set for '${bucket}'`);
    } catch (policyError) {
      console.warn(`Could not set bucket policy for '${bucket}':`, policyError.message);
    }

    // Upload the file with public-read ACL (with retry logic)
    let uploadSuccess = false;
    let lastUploadError = null;
    
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Uploading file (attempt ${attempt}/3): ${objectName}`);
        
        await Promise.race([
          minioClient.putObject(bucket, objectName, buffer, {
            'Content-Type': contentType
          }, {
            'x-amz-acl': 'public-read'
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Upload timeout')), 120000)) // Increased to 2 minutes for server environment
        ]);
        
        uploadSuccess = true;
        console.log(`File uploaded successfully on attempt ${attempt}`);
        break;
      } catch (uploadError) {
        lastUploadError = uploadError;
        console.warn(`Upload attempt ${attempt} failed:`, uploadError.message);
        
        if (attempt < 3) {
          console.log(`Retrying upload in 2 seconds...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
    
    if (!uploadSuccess) {
      throw lastUploadError || new Error('Upload failed after all retry attempts');
    }

    // Generate public URL
    const endpointUrl = new URL(process.env.S3_ENDPOINT);
    const protocol = endpointUrl.protocol;
    const hostname = endpointUrl.hostname;
    const port = endpointUrl.port ? `:${endpointUrl.port}` : '';
    const publicUrl = `${protocol}//${hostname}${port}/${bucket}/${objectName}`;

    // Replace base URL if S3_BASE_URL is configured
    const finalUrl = replaceBaseUrl(publicUrl);

    return {
      success: true,
      url: finalUrl,
      bucket: bucket,
      object: objectName
    };
  } catch (error) {
    console.error('Error uploading to MinIO:', error);
    
    // Check if it's a connection timeout error
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED' || error.message.includes('timeout')) {
      console.warn('MinIO server is not reachable, falling back to local storage');
      return {
        success: false,
        error: 'MinIO server tidak dapat dijangkau. Silakan coba lagi nanti atau hubungi administrator.',
        url: '',
        fallback: true
      };
    }
    
    return {
      success: false,
      error: error.message,
      url: ''
    };
  }
};

// Upload file to private MinIO bucket
const uploadToMinioPrivate = async (bucketName, objectName, buffer, contentType = 'application/octet-stream') => {
  if (!isMinioEnabled) {
    console.log('MinIO is disabled');
    return { success: false, url: '' };
  }

  try {
    // Check if bucket exists, if not create it
    const bucketExists = await minioClientPrivate.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClientPrivate.makeBucket(bucketName, process.env.MINIO_REGION || 'us-east-1');
      console.log(`Private bucket '${bucketName}' created successfully.`);
    }

    // Upload the file
    await minioClientPrivate.putObject(bucketName, objectName, buffer, {
      'Content-Type': contentType
    });

    // Generate URL with 5 months expiration (5 * 30 * 24 * 60 * 60 seconds)
    const fiveMonthsInSeconds = 5 * 30 * 24 * 60 * 60;
    const url = await minioClientPrivate.presignedGetObject(
      bucketName,
      objectName,
      fiveMonthsInSeconds
    );

    // Replace base URL if S3_BASE_URL is configured
    const finalUrl = replaceBaseUrl(url);

    return {
      success: true,
      url: finalUrl,
      bucket: bucketName,
      object: objectName
    };
  } catch (error) {
    console.error('Error uploading to MinIO Private:', error);
    return {
      success: false,
      error: error.message,
      url: ''
    };
  }
};

// Delete file from MinIO
const deleteFromMinio = async (bucketName, objectName, isPrivate = false) => {
  if (!isMinioEnabled) {
    console.log('MinIO is disabled');
    return { success: false };
  }

  try {
    const client = isPrivate ? minioClientPrivate : minioClient;
    await client.removeObject(bucketName, objectName);
    return { success: true };
  } catch (error) {
    console.error('Error deleting from MinIO:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get signed URL for file access
const defaultExpiry = 5 * 30 * 24 * 60 * 60; // 5 months in seconds
const getSignedUrl = async (bucketName, objectName, expiry = defaultExpiry, isPrivate = false) => {
  if (!isMinioEnabled) {
    console.log('MinIO is disabled');
    return '';
  }

  try {
    const client = isPrivate ? minioClientPrivate : minioClient;
    const url = await client.presignedGetObject(bucketName, objectName, expiry);
    
    // Replace base URL if S3_BASE_URL is configured
    const finalUrl = replaceBaseUrl(url);
    return finalUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return '';
  }
};

// Set bucket policy untuk public access
const setBucketPublicPolicy = async (bucketName) => {
  if (!isMinioEnabled) {
    console.log('MinIO is disabled');
    return false;
  }

  try {
    const bucketPolicy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${bucketName}/*`]
        }
      ]
    };

    await minioClient.setBucketPolicy(bucketName, JSON.stringify(bucketPolicy));
    console.log(`Bucket policy set for '${bucketName}' - Public access enabled`);
    return true;
  } catch (error) {
    console.error(`Error setting bucket policy for '${bucketName}':`, error);
    return false;
  }
};

// Check bucket policy
const getBucketPolicy = async (bucketName) => {
  if (!isMinioEnabled) {
    console.log('MinIO is disabled');
    return null;
  }

  try {
    const policy = await minioClient.getBucketPolicy(bucketName);
    console.log(`Bucket policy for '${bucketName}':`, policy);
    return policy;
  } catch (error) {
    console.error(`Error getting bucket policy for '${bucketName}':`, error);
    return null;
  }
};

module.exports = {
  minioClient,
  minioClientPrivate,
  isMinioEnabled,
  uploadToMinio,
  uploadToMinioPrivate,
  deleteFromMinio,
  getSignedUrl,
  setBucketPublicPolicy,
  getBucketPolicy,
  testMinioConnection,
  replaceBaseUrl
};
