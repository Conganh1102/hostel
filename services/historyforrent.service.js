var HistoryForRent = require('../models/history-for-rent');

_this = this;

exports.findHFRById = async function(id, fields) {
    try {
        let hfrs = await HistoryForRent.findOne({_id: id}).select(fields);
        return hfrs;
    } catch (error) {
        throw Error('Error occured while finding HFR by Id: ' + error);
    }
}

exports.findHFRByRoomId = async function(roomId, fields) {
    try {
        let hfrs = await HistoryForRent.find({roomId: roomId}).select(fields);
        return hfrs;
    } catch (error) {
        throw Error('Error occured while finding HFR by Id: ' + error);
    }
}

exports.createHFR = async function(hfr) {
    var newHFR = new HistoryForRent({
        roomId: hfr.roomId,
        history: hfr.history
    });
    try {
        var createdHFR = await newHFR.save();
        return createdHFR;
    } catch (error) {
        throw Error('Error occured while creating HFR: ' + error);
    }
}

exports.deleteHFR = async function(id) {
        
    // Delete the HFR
    try {
        var deleted = await HistoryForRent.remove({_id: id});
        if(deleted.n === 0) {
            throw Error('HFR could not be deleted');
        }
    } catch (error) {
        throw Error('Error occured while delete the HFR: ' + error);
    }
}