// Use multer to save image files
const multer = require('multer');

// Changing file extension
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// tells the multer where to save incoming files
const storage = multer.diskStorage({
  // to save files in the "images" folder
  destination: (req, file, callback) => {
      callback(null, 'images')
  },
  // tells  multer  to use the original name: original name + unique number + . + extension
  filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
  }
});
// passing it the storage constant, and telling it to handle uploads of single image files.
module.exports = multer({ storage }).single('image');