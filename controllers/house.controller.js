// Accessing the Service the we just created

var HouseService = require('../services/houses.service');

// saving the context of this module inside _the variable

_this = this;

// Async Controller function to get the House List
exports.getOwnHouseList = async function(req, res, next) {
    // Id is necessary for the update

    if(!req.decoded.userId){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }
    try {
        const houses = await HouseService.findHouseByTenantId(req.decoded.userId);
        res.status(200).json({status: 200, houses: houses, message: "Successfully!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}

exports.createHouse = async function(req, res, next) {
    // Id is necessary for the update

    if(!req.decoded.userId){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    if (!(req.body.housename && req.body.address && req.body.lat && req.body.lng
    && req.body.electricity_price && req.body.water_price)) {
        return res.status(400).json({status: 400, message: "The form invalid"});
    }

    let house = {
        tenantId: req.decoded.userId,
        name: req.body.housename,
        address: req.body.address,
        position: {
            lat: req.body.lat,
            lng: req.body.lng
        },
        electricity_price: req.body.electricity_price,
        water_price: req.body.water_price
    }

    try {
        var createdHouse = await HouseService.createHouse(house);
        res.status(201).json({status: 201, createdHouse: createdHouse, message: "Successfully"});
    } catch (error) {
        console.log(error.message); 
        res.status(500).json({status: 500, message: error.message});
    }

}

exports.updateHouse = async function(req, res, next) {
    // Id is necessary for the update

    if(!req.decoded.userId){
        return res.status(400).json({status: 400., message: "UserId must be present"});
    }
    if (!req.body.houseId) {
        return res.status(400).json({status: 400, message: "HouseId must be present"});
    }
    var house = {
        id: req.body.houseId,
        tenantId: req.decoded.userId,
        position: {
            lat: req.body.lat ? req.body.lat : null,
            lng: req.body.lng ? req.body.lng : null
        },
        electricity_price: req.body.electricity_price ? req.body.electricity_price : null,
        water_price: req.body.water_price ? req.body.water_price : null

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
        return res.status(400).json({status: 400., message: "UserId must be present"});
    }
    if (!req.params.houseId) {
        return res.status(400).json({status: 400, message: "HouseId must be present"});
    }

    try {
        await HouseService.deleteHouse(req.params.houseId);
        res.status(200).json({status: 200, message: "Deleted"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
        console.log(error);
    }

}
