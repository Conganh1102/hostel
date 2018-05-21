var express = require('express');
var storage = require('../../config/fileUpload');
var multer = require('multer');
var uploadAvatar = multer({ storage: storage.storageAvatar });
var router = express.Router();

// Getting the Controllers that we just created

var UserController = require('../../controllers/users.controller');
var AuthenticationController = require('../../controllers/authentication.controller');
var AccessController = require('../../controllers/access.controller');
var HouseController = require('../../controllers/house.controller');

// Map each API to the Controller function

//router.use(AccessController.CheckToken);

router.put('/update-password', [AuthenticationController.CheckToken, UserController.changePassword]);
router.get('/profile', [AuthenticationController.CheckToken, UserController.getProfile]);
router.get('/public-profile/:userId', UserController.getPublicProfile);
router.post('/upload-avatar', [AuthenticationController.CheckToken, uploadAvatar.single('avatar'), UserController.uploadAvatar, UserController.updateUserInfo]);

// Export the Router
module.exports = router;