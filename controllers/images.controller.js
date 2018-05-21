const directoryConfig = require('../config/directory');
var fs = require('fs');

exports.getAvatarImage = function(req, res, next) {
    if (!req.params.filename) {
        return res.status(400).json({status: 400, message: 'Name of image is not provided'});
    }
    if (!fs.existsSync(directoryConfig.avatarUploadPath + req.params.filename)) {
        return res.sendFile(directoryConfig.commonImagePath + 'default-avatar.jpg');
    }
    res.sendFile(directoryConfig.avatarUploadPath + req.params.filename);
}
exports.getCommonImage = function(req, res, next) {
    if (!req.params.filename) {
        return res.status(400).json({status: 400, message: 'Name of image is not provided'});
    }
    res.sendFile(directoryConfig.commonImagePath + req.params.filename);
}

exports.getRoomImage = function(req, res, next) {
    if (!req.params.filename) {
        return res.status(400).json({status: 400, message: 'Name of image is not provided'});
    }
    res.sendFile(directoryConfig.roomImagePath + req.params.filename);
}