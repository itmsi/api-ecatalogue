require('dotenv').config();

const Minio = require('minio');
const http = require('http');
const https = require('https');

// Create custom agents with timeout
const httpAgent = new http.Agent({
  timeout: 15000, // 15 seconds timeout
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 50,
  maxFreeSockets: 10
});

const httpsAgent = new https.Agent({
  timeout: 15000, // 15 seconds timeout
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 50,
  maxFreeSockets: 10,
  rejectUnauthorized: false // Allow self-signed certificates
});

// Check if MinIO is enabled
const isMinioEnabled = process.env.S3_PROVIDER === 'minio';

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
const testMinioConnection = async (client, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`Testing MinIO connection (attempt ${i + 1}/${maxRetries})`);
      
      // Try to list buckets as a connection test
      await Promise.race([
        client.listBuckets(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Connection test timeout')), 10000))
      ]);
      
      console.log('MinIO connection test successful');
      return true;
    } catch (error) {
      console.warn(`MinIO connection test attempt ${i + 1} failed:`, error.message);
      if (i === maxRetries - 1) {
        console.error('All MinIO connection tests failed');
        return false;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
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
  console.log('===============================');

  try {
    // Test connection first
    const connectionOk = await testMinioConnection(minioClient);
    if (!connectionOk) {
      throw new Error('MinIO connection test failed');
    }

    // Check if bucket exists, if not create it
    let bucketExists = false;
    try {
      bucketExists = await Promise.race([
        minioClient.bucketExists(bucket),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Bucket check timeout')), 15000))
      ]);
    } catch (bucketCheckError) {
      console.warn('Bucket check failed, assuming bucket does not exist:', bucketCheckError.message);
      bucketExists = false;
    }
    
    if (!bucketExists) {
      try {
        await Promise.race([
          minioClient.makeBucket(bucket, process.env.S3_REGION || 'us-east-1'),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Bucket creation timeout')), 15000))
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
        new Promise((_, reject) => setTimeout(() => reject(new Error('Policy set timeout')), 10000))
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
          new Promise((_, reject) => setTimeout(() => reject(new Error('Upload timeout')), 30000))
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

    return {
      success: true,
      url: publicUrl,
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

    return {
      success: true,
      url,
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
    return url;
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
  testMinioConnection
};
