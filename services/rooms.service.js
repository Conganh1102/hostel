// Getting the Newly created Mongoose Model we just created
var Room = require('../models/room');

// Saving the context of this module inside _the variable
_this = this;

// Async function to find the 

exports.findRoomById = async function(id, fields) {
    try {
        var room = await Room.findOne({_id: id}).select(fields);
        return room;
    } catch (error) {
        throw Error('Error occured while finding Room by Id: ' + error);
    }
}

exports.findRoomByHouseId = async function(id, fields) {
    try {
        var rooms = await Room.find({houseId: id}).select(fields);
        return rooms;
    } catch (error) {
        throw Error('Error occured while finding Room by houseId: ' + error);
    }
}

exports.createRoom = async function(room) {
    var newRoom = new Room({
        houseId: room.houseId,
        floor:  room.floor,
        area: room.area,
        price: room.price,
        roomNumber: room.roomNumber,
        // self_contained: room.self_contained,
        // kitchen: room.kitchen,
        other_info: room.other_info,
        images: room.images
    });
    try {
        var createdRoom = await newRoom.save();
        return createdRoom;
    } catch (error) {
        throw Error('Error occured while create Room: ' + error);
    }
}

exports.updateRoom = async function(room) {
    var id = room._id;

    try {
        var oldRoom = await Room.findById(id);
    } catch (error) {
        throw Error('Error occured while finding Room by Id: ' + error);
    }

    if (room.houseId) {
        oldRoom.houseId = room.houseId;
    }

    if (room.roomNumber) {
        oldRoom.roomNumber = room.roomNumber;
    }

    if (room.floor) {
        oldRoom = room.floor;
    }
    if (room.area) {
        oldRoom.area = room.area;
    }
    if (room.price) {
        oldRoom = room.price;
    }
    if (room.other_info) {
        oldRoom.other_info = room.other_info;
    }
    if (room.images) {
        oldRoom.images = room.images;
    }
    
    if (room.status) {
        oldRoom.status = room.status
    }

    try {
        var updatedRoom = await oldRoom.save();
        return updatedRoom;
    } catch (error) {
        throw Error('Error occured while update Room: ' + error);
    }
}

// 
exports.deleteRoom = async function(id) {
    // Delete the room
    try {
        let deleted = await Room.remove({_id: id});
        if(deleted.n === 0) {
            throw Error('Room could not be deleted');
        }
    } catch (error) {
        throw Error('Error occured while delete the Room: ' + error);
    }
}