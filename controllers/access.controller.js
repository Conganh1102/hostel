var UserService = require('../services/users.service');

exports.requireRole = function (role) {
    return function (req, res, next) {
        if (req.userRole === role) {
            next();
        } else {
            res.status(403).json({status: 403, message: "Permission is not provided"});
        }
    }
}
