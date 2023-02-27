const express = require("express");
// Call the router with the method provided by Express
const router = express.Router();
// We import the auth middleware in to secure the routes
const auth = require('../middleware/auth');
// We import the multer middleware for image management
const multer = require('../middleware/multer-config');
// we import the controller
const sauceCtrl = require('../controllers/sauce');

// Routes
router.get('/', auth, sauceCtrl.getAllSauces)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.post('/', auth, multer, sauceCtrl.createSauce)
router.put('/:id', auth, multer, sauceCtrl.modifySauce)
router.delete('/:id', auth, sauceCtrl.deleteSauce)
router.post('/:id/like', auth, sauceCtrl.likeOrDislike)
// export our Router
module.exports = router;
