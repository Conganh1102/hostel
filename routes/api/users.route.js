var express = require('express');
const storageAvatar = require('../../config/fileUpload');
var multer = require('multer');
var uploadAvatar = multer({ storage: storageAvatar });
var router = express.Router();

// Getting the Controllers that we just created

var UserController = require('../../controllers/users.controller');
var AuthenticationController = require('../../controllers/authentication.controller');
var AccessController = require('../../controllers/access.controller');

// Map each API to the Controller function

//router.use(AccessController.CheckToken);

router.get('/', UserController.getUsers);
router.put('/update-password', [AuthenticationController.CheckToken, UserController.changePassword]);
router.get('/profile', [AuthenticationController.CheckToken, UserController.getProfile]);
router.post('/upload-avatar', [AuthenticationController.CheckToken, uploadAvatar.single('avatar'), UserController.uploadAvatar, UserController.updateUserInfo]);

// Export the Router
module.exports = router;