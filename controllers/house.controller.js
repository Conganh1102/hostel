// Accessing the Service the we just created

var HouseService = require('../services/houses.service');

// saving the context of this module inside _the variable

_this = this;

// Async Controller function to get the House List
exports.getOwnHouseList = async function(req, res, next) {
    // Id is necessary for the update

    if(!req.decoded.userId){
        return res.status(400).json({status: 400, message: "Id must be present"})
    }
    try {
        const houses = await HouseService.findHouseByTenantId(req.decoded.userId);
        res.status(200).json({status: 200, houses: houses, message: "Successfully!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}

exports.getSingleHouse = async function(req, res, next) {
    // Id is necessary for the update

    if(!req.params.id){
        return res.status(400).json({status: 400, message: "Id must be present"})
    }
    try {
        const house = await HouseService.findHouseById(req.params.id);
        res.status(200).json({status: 200, house: house, message: "Successfully!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}

exports.createHouse = async function(req, res, next) {
    // Id is necessary for the update

    if(!req.decoded.userId){
        return res.status(400).json({status: 400, message: "Id must be present"})
    }

    if (!(req.body.address && req.body.lat && req.body.lng
    && req.body.info)) {
        return res.status(400).json({status: 400, message: "The form invalid"});
    }

    let house = {
        tenantId: req.decoded.userId,
        address: req.body.address,
        position: {
            lat: req.body.lat,
            lng: req.body.lng
        },
        // electricity_price: req.body.electricity_price,
        // water_price: req.body.water_price
        info: req.body.info
    }

    try {
        var createdHouse = await HouseService.createHouse(house);
        res.status(201).json({status: 201, createdHouse: createdHouse, message: "Successfully"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }

}

exports.updateHouse = async function(req, res, next) {
    // Id is necessary for the update

    if(!req.decoded.userId){
        return res.status(400).json({status: 400, message: "UserId must be present"});
    }
    if (!req.body.houseId) {
        return res.status(400).json({status: 400, message: "HouseId must be present"});
    }

    if (!req.body.tenantId || req.body.tenantId !== req.decoded.userId) {
        return res.status(403).json({status: 403, message: "You are not owner of house. You can not update this house"});
    }
    var house = {
        id: req.body.houseId,
        tenantId: req.body.tenantId,
        address: req.body.address ? req.body.address : null,
        position: {
            lat: req.body.lat ? req.body.lat : null,
            lng: req.body.lng ? req.body.lng : null
        },
        // electricity_price: req.body.electricity_price ? req.body.electricity_price : null,
        // water_price: req.body.water_price ? req.body.water_price : null
        info: req.body.info ? req.body.info: null

    }
    try {
        var updatedHouse = HouseService.updateHouse(house);
        res.status(200).json({status: 200, updatedHouse: updatedHouse, message: "Successfully!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
    
}

exports.deleteHouse = async function(req, res, next) {
    // Id is necessary for the update

    if(!req.decoded.userId){
        return res.status(400).json({status: 400, message: "UserId must be present"});
    }
    if (!req.params.houseId) {
        return res.status(400).json({status: 400, message: "HouseId must be present"});
    }

    try {
        const house = await HouseService.findHouseById(req.params.houseId);
        if (house.tenantId !== req.decoded.userId) {
            return res.status(403).json({status: 403, message: "You are not owner of house. You can not delete this house"});
        }
        await HouseService.deleteHouse(req.params.houseId);
        res.status(200).json({status: 200, message: "Deleted"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }

}
