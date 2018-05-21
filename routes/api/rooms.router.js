var express = require('express');

var router = express.Router();

// Getting the Controllers that we just created
var RoomController = require('../../controllers/room.controller');
var AuthenticationController = require('../../controllers/authentication.controller');

router.get('/get-rooms-by-houseid/:houseId', RoomController.getRoomsByHouseId);
router.get('/get-single-room/:id', RoomController.getSingleRoom);
router.post('/create-room', RoomController.createRoom);
router.put('/update-room', [AuthenticationController.CheckToken, RoomController.updateRoom]);
router.delete('/delete-room/:roomId', [AuthenticationController.CheckToken, RoomController.deleteRoom]);

// Export the Router
module.exports = router;