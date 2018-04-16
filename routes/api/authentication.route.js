var express = require('express');

var router = express.Router();

// Getting the Controllers that we just created
var UserController = require('../../controllers/users.controller');
var AuthenticationController = require('../../controllers/authentication.controller');

// Map each API to the Controller function
router.post('/register', UserController.register);
router.post('/login', AuthenticationController.login);
router.get('/checkUsername/:username', AuthenticationController.checkUsername);
router.get('/checkEmail/:email', AuthenticationController.checkEmail);
router.get('/checkAdmin', [AuthenticationController.CheckToken, AuthenticationController.checkAdmin]);
router.get('/checkLoggedIn', AuthenticationController.CheckToken, AuthenticationController.checkLoggedIn);

// Export the Router
module.exports = router;