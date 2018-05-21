var multer = require('multer');
var directoryUploadConfig = require('./directory');

exports.storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, directoryUploadConfig.avatarUploadPath)
    },
    filename: function (req, file, cb) {
      newFileName = 'avatar_' + req.decoded.userId + '_' + Date.now() + '.jpg';
      cb(null, newFileName);
    }
})

exports.storageRoomImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directoryUploadConfig.roomImagePath)
  },
  filename: function (req, file, cb) {
    newFileName = 'room_images_' + '_' + Date.now() + '.jpg';
    cb(null, newFileName);
  }
})
