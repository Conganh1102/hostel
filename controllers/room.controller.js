// Accessing the Service the we just created

var RoomService = require('../services/rooms.service');

// saving the context of this module inside _the variable

_this = this;

// function to get room list of own house

exports.getRoomsByHouseId = async function(req, res, next) {
    // Id is necessary for the update
    
    if (!req.params.houseId) {
        return res.status(400).json({status: 400, message: "HouseId must be present"})
    }

    try {
        const rooms = await RoomService.findRoomByHouseId(req.params.houseId);
        res.status(200).json({status: 200, rooms: rooms, message: "Successfully!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}

exports.getSingleRoom = async function(req, res, next) {
    // Id is necessary for the update
    
    if (!req.params.id) {
        return res.status(400).json({status: 400, message: "roomId must be present"})
    }

    try {
        const room = await RoomService.findRoomById(req.params.id);
        res.status(200).json({status: 200, room: room, message: "Successfully!"});
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
        roomNumber: req.body.roomNumber,
        // self_contained: req.body.self_contained,
        // kitchen: req.body.kitchen,
        images: req.body.images,
        other_info: req.body.other_info ? req.body.other_info : null
    }

    try {
        let createdRoom = await RoomService.createRoom(room);
        res.status(201).json({status: 201, createdRoom: createdRoom, message: "Successfully!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}

exports.updateRoom = async function(req, res, next) {

    let room = {
        _id: req.body._id,
        houseId: req.body.houseId,
        floor: req.body.floor ? req.body.floor : null,
        area: req.body.area ? req.body.area : null,
        price: req.body.price ? req.body.price : null,
        roomNumber: req.body.roomNumber ? req.body.roomNumber : null,
        images: req.body.images ? req.body.images : null,
        other_info: req.body.other_info ? req.body.other_info : null,
        status: req.body.status ? req.body.status : null
    }

    try {
        let updatedRoom = await RoomService.updateRoom(room);
        res.status(201).json({status: 201, updatedRoom: updatedRoom, message: "Successfully!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}

exports.deleteRoom = async function(req, res, next) {
    // Id is necessary for the update

    if(!req.decoded.userId){
        return res.status(400).json({status: 400., message: "UserId must be present"});
    }
    if (!req.params.roomId) {
        return res.status(400).json({status: 400, message: "HouseId must be present"});
    }

    try {
        await RoomService.deleteRoom(req.params.roomId);
        return res.status(200).json({status: 200, message: "The room is deleted"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }

}