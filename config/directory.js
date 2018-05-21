var path = require('path');

module.exports = {
    avatarUploadPath: path.join(process.env.MY_DIR_NAME, "uploads/images/avatars/"),
    commonImagePath : path.join(process.env.MY_DIR_NAME, "commons/images/"),
    roomImagePath: path.join(process.env.MY_DIR_NAME, "uploads/images/rooms/")
}