var express = require('express');
var directoryConfig = require('../../config/directory');
var ImageController = require('../../controllers/images.controller');

var router = express.Router();

router.get('/u/avatar/:filename', ImageController.getAvatarImage);
router.get('/commons/:filename', ImageController.getCommonImage);
router.get('/room/:filename', ImageController.getRoomImage);

// Export the Router
module.exports = router;