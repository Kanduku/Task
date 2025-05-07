const multer = require('multer');
const path = require('path');

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = '';
    if (file.mimetype.startsWith('image/')) {
      folder = 'uploads/images/';
    } else if (file.mimetype.startsWith('video/')) {
      folder = 'uploads/videos/';
    } else {
      folder = 'uploads/files/';
    }
    cb(null, folder); // Set the folder based on file type
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName); // Generate unique file name
  }
});

// Middleware for handling file uploads (single or multiple files)
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // Max file size: 20MB
}).array('files', 10); // Allow up to 10 files

// Helper function to handle file uploads
const uploadFiles = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'File upload failed', error: err.message });
    }
    next();
  });
};

module.exports = uploadFiles;
