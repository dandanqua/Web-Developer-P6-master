const mongoose = require('mongoose');

// Creates the sauce model for storage in the database
const SauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, require: true },
  dislikes: { type: Number, require: true },
  usersLiked: { type: [String], require: true },
  usersDisliked: { type: [String], required: true},
});

// we then export is a model called sauce
module.exports = mongoose.model('Sauce', SauceSchema);