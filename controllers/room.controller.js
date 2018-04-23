// Accessing the Service the we just created

var RoomService = require('../services/rooms.service');

// saving the context of this module inside _the variable

_this = this;

// function to get room list of own house

exports.getRoomsOfTenant = async function(req, res, next) {
    // Id is necessary for the update

    if(!req.decoded.userId){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    try {
        const rooms = await RoomService.getRoomsOfTenant(req.decoded.userId);
        res.status(200).json({status: 200, rooms: rooms, message: "Successfully!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}

exports.createRoom = async function(req, res, next) {
    
    let room = {
        houseId: req.body.houseId,
        floor: req.body.floor,
        area: req.body.area,
        price: req.body.price,
        self_contained: req.body.self_contained,
        kitchen: req.body.kitchen,
        images: req.body.images,
        other_info: req.body.other_info ? req.body.other_info : null
    }

    try {
        let createdRoom = await RoomService.createRoom();
        res.status(201).json({status: 201, createdRoom: createdRoom, message: "Successfully!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}

exports.updateRoom = async function(req, res, next) {

}

exports.deleteRoom = async function(req, res, next) {
    // Id is necessary for the update

    if(!req.decoded.userId){
        return res.status(400).json({status: 400., message: "UserId must be present"});
    }
    if (!req.body.houseId) {
        return res.status(400).json({status: 400, message: "HouseId must be present"});
    }

    try {
        await HouseService.deleteHouse(req.body.houseId);
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }

}