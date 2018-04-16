// Getting the Newly created Mongoose Model we just created
var House = require('../models/house');

// Saving the context of this module inside _the variable
_this = this;

// Async function to find the House by Id

exports.findUserById = async function(id, fields) {
    try {
        var house = await House.findOne({_id: id}).select(fields);
        return house;
    } catch (error) {
        throw Error('Error occured while finding House by Id: ' + error);
    }
}

// Async function to find the House by tenantId

exports.findUserByTenantId = async function(id, fields) {
    try {
        var house = await House.findOne({tenantId: id}).select(fields);
        return house;
    } catch (error) {
        throw Error('Error occured while finding House by tenantId: ' + error);
    }
}

// 
exports.createHouse = async function(house) {
    var house = new House({
        tenantId: house.tenantId,
        position: house.position,
        roomsId: house.roomsId,
        electricity_price: house.electricity_price,
        water_price: house.water_price
    });

    try {
        var createdHouse = await house.save();
        return createdHouse;
    } catch (error) {
        throw Error('Error occured while creating House: ' + error);
    }
}

// 
exports.updateHouse = async function(house) {
    var id = house.id;

    try {
        var oldHouse = await House.findUserById(id);
    } catch (error) {
        throw Error('Error occured while finding House:' + error)
    }
    if (!oldHouse) {
        return false;
    }

    // Edit old house
    if (house.tenantId) {
        oldHouse.tenantId = house.tenantId;
    }
    if (house.position) {
        oldHouse.position = house.position;
    }
    if (house.rommsId) {
        oldHouse.rommsId = house.roomsId;
    }
    if (house.electricity_price) {
        oldHouse.electricity_price = house.electricity_price;
    }
    if (house.water_price) {
        oldHouse.water_price = house.water_price;
    }
    try {
        var updatedHouse = await oldHouse.save();
        return updatedHouse;
    } catch (error) {
        throw Error('Error occured while update House: ' + error);
    }
}

// 
exports.deleteHouse = async function(id) {
    
    // Delete the house
    try {
        var deleted = await House.remove({_id: id});
        if(deleted.result.n === 0) {
            throw Error('User could not be deleted');
        }
    } catch (error) {
        throw Error('Error occured while delete the House: ' + error);
    }
}