var express = require('express');

var router = express.Router();

// Getting the Controllers that we just created
var HouseController = require('../../controllers/house.controller');
var AuthenticationController = require('../../controllers/authentication.controller');

router.get('/get-own-houses', [AuthenticationController.CheckToken, HouseController.getOwnHouseList]);
router.post('/create-house', [AuthenticationController.CheckToken, HouseController.createHouse]);

// Export the Router
module.exports = router;