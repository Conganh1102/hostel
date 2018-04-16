var multer = require('multer');
var directoryUploadConfig = require('./directory');

var storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, directoryUploadConfig.avatarUploadPath)
    },
    filename: function (req, file, cb) {
      newFileName = 'avatar_' + req.decoded.userId + '_' + Date.now() + '.jpg';
      cb(null, newFileName);
    }
})


module.exports = storageAvatar;