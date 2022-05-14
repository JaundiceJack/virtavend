const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Create a storage space on the disk
const storage = multer.diskStorage({
  // Assign folder to use
  destination(req, file, cb) {
    cb(null, './uploads')
  },
  // Rename the file
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

// Ensure upload is an image
function checkFileType (file, cb) {
  const fileTypes = /jpg|jpeg|png/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (extname && mimeType) return cb(null, true)
  else cb('Image type must be .jpg, .jpeg, or .png.');
}

// Make an upload middleware
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

// POST: api/upload/ | upload product images |
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path.replace('\\', '/')}`)
})

module.exports = router;
