var express = require('express');

var router = express.Router();

// Getting the Controllers that we just created
var HouseController = require('../../controllers/house.controller');
var AuthenticationController = require('../../controllers/authentication.controller');

router.get('/get-own-houses', [AuthenticationController.CheckToken, HouseController.getOwnHouseList]);
router.get('/get-single-house/:id', HouseController.getSingleHouse);
router.post('/create-house', [AuthenticationController.CheckToken, HouseController.createHouse]);
router.put('/update-house', [AuthenticationController.CheckToken, HouseController.updateHouse]);
router.delete('/delete-house/:houseId', [AuthenticationController.CheckToken, HouseController.deleteHouse]);

// Export the Router
module.exports = router;