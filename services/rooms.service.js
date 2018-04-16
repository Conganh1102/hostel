// Getting the Newly created Mongoose Model we just created
var Room = require('../models/room');

// Saving the context of this module inside _the variable
_this = this;

// Async function to find the House by Id

exports.findUserById = async function(id, fields) {
    try {
        var romm = await Room.findOne({_id: id}).select(fields);
        return room;
    } catch (error) {
        throw Error('Error occured while finding Room by Id: ' + error);
    }
}

exports.addRoom = async function(room) {
    var newRoom = new Room({
        floor:  room.floor,
        area: room.area,
        price: room.price,
        self_contained: room.self_contained,
        kitchen: room.kitchen,
        other_info: room.other_info,
        images: room.images
    });
}

exports.updateRoom = async function(room) {
    var id = room.id;

    try {
        var oldRoom = await Room.findUserById(id);
    } catch (error) {
        throw Error('Error occured while finding Room by Id: ' + error);
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
    if (room.self_contained) {
        oldRoom.self_contained = room.self_contained;
    }
    if (room.kitchen) {
        oldRoom.kitchen = room.kitchen;
    }
    if (room.other_info) {
        oldRoom.other_info = room.other_info;
    }
    if (room.images) {
        oldRoom.images = room.images;
    }

    try {
        var updatedRoom = await oldRoom.save();
        return updaedRoom;
    } catch (error) {
        throw Error('Error occured while update Room: ' + error);
    }
}

// 
exports.deleteRoom = async function(id) {
    // Delete the room
    try {
        var deleted = await Room.remove({_id: id});
        if(deleted.result.n === 0) {
            throw Error('Room could not be deleted');
        }
    } catch (error) {
        throw Error('Error occured while delete the Room: ' + error);
    }
}