const Sauce = require('../models/sauce');
const fs = require('fs')

// Retrieve the list of all sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({ error: error }))
}

// Retrieve a single sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json({ error: error }))
};


// Creating a New Sauce (Post)
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id
  const sauce = new Sauce({
  ...sauceObject,
  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  likes: 0,
  dislikes: 0,
  usersLiked: [' '],
  usersdisLiked: [' '],
  });
  sauce.save()
  .then(() => res.status(201).json({ message: 'Post saved successfully !' }))
  .catch(error => res.status(400).json({ error }))
}

// Modify a sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body }
  if(req.file) {
   Sauce.findOne({_id: req.params.id})
   .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1] 
    fs.unlink(`images/${filename}`, () => {
      Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Modified sauce !' }))
      .catch(error => res.status(400).json({ error }))
    })
   })
   .catch(err => req.status(404).json(err))
  } else {
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Modified sauce !' }))
    .catch(error => res.status(400).json({ error }))
  }
}

// Delete a sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1]
    // Delete the file (unlink)
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce removed !' }))
      .catch(error => res.status(400).json({ error: error }))
    })
  })
  .catch(error => res.status(500).json({ error }))
}

// To like Or Dislike a sauce
exports.likeOrDislike = (req, res, next) => { // Manage likes and dislikes - POST
  Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
          if (req.body.like == 1) { // If a like
              sauce.usersLiked.push(req.body.userId);
              Sauce.updateOne({ _id: req.params.id }, {
                  sauce,
                  usersLiked: sauce.usersLiked,
                  likes: sauce.usersLiked.length
              })
                  .then(() => res.status(200).json({ message: "favorite sauce !" }))
                  .catch(e => res.status(400).json(e));
          } else if (req.body.like == -1) { // If a dislike
              sauce.usersDisliked.push(req.body.userId);
              Sauce.updateOne({ _id: req.params.id }, {
                  sauce,
                  usersDisliked: sauce.usersDisliked,
                  dislikes: sauce.usersDisliked.length
              })
                  .then(() => res.status(200).json({ message: "disliked sauce !" }))
                  .catch(e => res.status(400).json(e));
          } else if (req.body.like == 0) { // If neutral
              sauceLiked = sauce.usersLiked.indexOf(req.body.userId);
              sauceDisliked = sauce.usersDisliked.indexOf(req.body.userId);
              if (sauceLiked == -1) { 
                  sauce.usersDisliked.splice(sauceDisliked, 1);
                  Sauce.updateOne({ _id: req.params.id }, {
                      sauce,
                      usersDisliked: sauce.usersDisliked,
                      dislikes: sauce.usersDisliked.length
                  })
                      .then(() => res.status(200).json({ message: "Most hated sauce !" }))
                      .catch(e => res.status(400).json(e));
              } else { 
                  sauce.usersLiked.splice(sauceLiked, 1);
                  Sauce.updateOne({ _id: req.params.id }, {
                      sauce,
                      usersLiked: sauce.usersLiked,
                      likes: sauce.usersLiked.length
                  })
                      .then(() => res.status(200).json({ message: "Most liked sauce !" }))
                      .catch(e => res.status(400).json(e));
              }
          }
      })
      .catch(e => res.status(500).json(e));
};