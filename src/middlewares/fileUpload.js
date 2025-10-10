const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
  // Allow specific file types for PowerBI reports
  const allowedTypes = [
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/pdf', // .pdf
    'text/csv', // .csv
    'application/json', // .json
    'application/xml', // .xml
    'text/xml', // .xml
    'application/zip', // .zip
    'application/x-zip-compressed', // .zip
    'application/octet-stream' // .pbix and other binary files
  ];

  // Check file extension as fallback
  const allowedExtensions = ['.xls', '.xlsx', '.pdf', '.csv', '.json', '.xml', '.zip', '.pbix'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error(`File type not allowed. Allowed types: ${allowedExtensions.join(', ')}`), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 1 // Only one file per request
  }
});

// Middleware for single file upload
const uploadSingleFile = upload.single('file');

// Middleware wrapper to handle multer errors
const handleFileUpload = (req, res, next) => {
  uploadSingleFile(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File too large. Maximum size is 50MB.',
          error: err.message
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Only one file is allowed.',
          error: err.message
        });
      }
      return res.status(400).json({
        success: false,
        message: 'File upload error',
        error: err.message
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: 'File validation error',
        error: err.message
      });
    }
    next();
  });
};

// Generate unique filename
const generateFileName = (originalName) => {
  const timestamp = Date.now();
  const uuid = uuidv4();
  const extension = path.extname(originalName);
  const baseName = path.basename(originalName, extension);
  
  // Sanitize filename
  const sanitizedName = baseName.replace(/[^a-zA-Z0-9-_]/g, '_');
  
  return `powerbi/${timestamp}_${uuid}_${sanitizedName}${extension}`;
};

// Generate unique filename for catalog images
const generateCatalogImageFileName = (originalName) => {
  const timestamp = Date.now();
  const uuid = uuidv4();
  const extension = path.extname(originalName);
  const baseName = path.basename(originalName, extension);
  
  // Sanitize filename
  const sanitizedName = baseName.replace(/[^a-zA-Z0-9-_]/g, '_');
  
  return `catalog-images/${timestamp}_${uuid}_${sanitizedName}${extension}`;
};

// Get content type based on file extension
const getContentType = (filename) => {
  const extension = path.extname(filename).toLowerCase();
  const contentTypes = {
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.pdf': 'application/pdf',
    '.csv': 'text/csv',
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.zip': 'application/zip',
    '.pbix': 'application/octet-stream'
  };
  
  return contentTypes[extension] || 'application/octet-stream';
};

// Image file filter function
const imageFileFilter = (req, file, cb) => {
  // Allow specific image file types
  const allowedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ];

  // Check file extension as fallback
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error(`File type not allowed. Allowed types: ${allowedExtensions.join(', ')}`), false);
  }
};

// Configure multer for image uploads
const imageUpload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for images
    files: 1 // Only one file per request
  }
});

// Middleware for single image upload
const uploadSingleImage = imageUpload.single('catalog_image');

// Alternative: use fields to handle optional file
const uploadImageFields = imageUpload.fields([{ name: 'catalog_image', maxCount: 1 }]);

// CSV file filter function
const csvFileFilter = (req, file, cb) => {
  // Allow CSV file types
  const allowedTypes = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/csv',
    'text/x-csv',
    'application/x-csv',
    'text/comma-separated-values',
    'text/x-comma-separated-values'
  ];

  // Check file extension as fallback
  const allowedExtensions = ['.csv'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error(`File type not allowed. Only CSV files are allowed.`), false);
  }
};

// Configure multer for mixed uploads (image + CSV)
const mixedUploadStorage = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 2 // catalog_image + data_csv
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'catalog_image') {
      imageFileFilter(req, file, cb);
    } else if (file.fieldname === 'data_csv') {
      csvFileFilter(req, file, cb);
    } else {
      cb(null, true);
    }
  }
});

// Middleware for catalog with image and CSV
const uploadCatalogFields = mixedUploadStorage.fields([
  { name: 'catalog_image', maxCount: 1 },
  { name: 'data_csv', maxCount: 1 }
]);

// Middleware wrapper to handle image upload errors
const handleImageUpload = (req, res, next) => {
  uploadImageFields(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File terlalu besar. Maksimal 10MB.',
          error: err.message
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Terlalu banyak file. Hanya satu file yang diizinkan.',
          error: err.message
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Error upload file',
        error: err.message
      });
    } else if (err) {
      // Handle file validation errors
      if (err.message.includes('File type not allowed')) {
        return res.status(400).json({
          success: false,
          message: 'File tidak valid. Hanya file gambar yang diizinkan.',
          error: err.message
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Error upload file',
        error: err.message
      });
    }
    
    // Convert req.files to req.file format for compatibility
    if (req.files && req.files.catalog_image && req.files.catalog_image.length > 0) {
      req.file = req.files.catalog_image[0];
    }
    
    next();
  });
};

// Middleware wrapper to handle catalog upload (image + CSV)
const handleCatalogUpload = (req, res, next) => {
  uploadCatalogFields(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File terlalu besar. Maksimal 10MB per file.',
          error: err.message
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Terlalu banyak file.',
          error: err.message
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Error upload file',
        error: err.message
      });
    } else if (err) {
      // Handle file validation errors
      return res.status(400).json({
        success: false,
        message: 'Error validasi file',
        error: err.message
      });
    }
    
    // Convert req.files to req.file format for catalog_image compatibility
    if (req.files && req.files.catalog_image && req.files.catalog_image.length > 0) {
      req.file = req.files.catalog_image[0];
    }
    
    // Keep CSV file in req.files.data_csv for processing
    
    next();
  });
};

// Configure multer for item catalog engine uploads (file_foto + file_csv)
const itemCatalogEngineUploadStorage = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 2 // file_foto + file_csv
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'file_foto') {
      imageFileFilter(req, file, cb);
    } else if (file.fieldname === 'file_csv') {
      csvFileFilter(req, file, cb);
    } else {
      cb(null, true);
    }
  }
});

// Middleware for item catalog engine with file_foto and file_csv
const uploadItemCatalogEngineFields = itemCatalogEngineUploadStorage.fields([
  { name: 'file_foto', maxCount: 1 },
  { name: 'file_csv', maxCount: 1 }
]);

// Middleware wrapper to handle item catalog engine upload errors
const handleItemCatalogEngineUpload = (req, res, next) => {
  uploadItemCatalogEngineFields(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File terlalu besar. Maksimal 10MB per file.',
          error: err.message
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Terlalu banyak file.',
          error: err.message
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Error upload file',
        error: err.message
      });
    } else if (err) {
      // Handle file validation errors
      return res.status(400).json({
        success: false,
        message: 'Error validasi file',
        error: err.message
      });
    }
    
    next();
  });
};

// Configure multer for item catalog transmission uploads (file_foto + file_csv)
const itemCatalogTransmissionUploadStorage = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 2 // file_foto + file_csv
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'file_foto') {
      imageFileFilter(req, file, cb);
    } else if (file.fieldname === 'file_csv') {
      csvFileFilter(req, file, cb);
    } else {
      cb(null, true);
    }
  }
});

// Middleware for item catalog transmission with file_foto and file_csv
const uploadItemCatalogTransmissionFields = itemCatalogTransmissionUploadStorage.fields([
  { name: 'file_foto', maxCount: 1 },
  { name: 'file_csv', maxCount: 1 }
]);

// Middleware wrapper to handle item catalog transmission upload errors
const handleItemCatalogTransmissionUpload = (req, res, next) => {
  uploadItemCatalogTransmissionFields(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File terlalu besar. Maksimal 10MB per file.',
          error: err.message
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Terlalu banyak file.',
          error: err.message
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Error upload file',
        error: err.message
      });
    } else if (err) {
      // Handle file validation errors
      return res.status(400).json({
        success: false,
        message: 'Error validasi file',
        error: err.message
      });
    }
    
    next();
  });
};

module.exports = {
  handleFileUpload,
  handleImageUpload,
  handleCatalogUpload,
  handleItemCatalogEngineUpload,
  handleItemCatalogTransmissionUpload,
  generateFileName,
  generateCatalogImageFileName,
  getContentType
};
