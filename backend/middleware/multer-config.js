// Use multer to save image files
const multer = require('multer');

// Changing file extension
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// this allows us to set the file name and its extentions
const storage = multer.diskStorage({
  // Saving in the "images" folder
  destination: (req, file, callback) => {
      callback(null, 'images')
  },
  // Generation of the file name: original name + unique number + . + extension
  filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage }).single('image');