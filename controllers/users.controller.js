// Accessing the Service the we just created

var UserService = require('../services/users.service');
const storageAvatar = require('../config/fileUpload');
var multer = require('multer');

// saving the context of this module inside _the variable

_this = this;

// Async Controller function to get the User List

exports.getUsers = async function(req, res, next) {

    // Check the existence of the query parameters, If the exists doesn'n exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var users = await UserService.getUsers({}, page, limit);
        // Return the user list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({status: 200, data: users, message: 'Succesfully Users Received'});
    } catch (error) {
        
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: error.message});
    }
}
  /* ===============
  REGISTER FUNCTION
  ================= */

exports.register = async function(req, res, next) {

    // Check the field that must be provided

    if(!req.body.username) {
        return res.status(400).json({status: 400, message: "You must provide a Username"});
    }
    if (!req.body.email) {
        return res.status(400).json({status: 400, message: "You must provide an Email"});
    }
    if(!req.body.password) {
        return res.status(400).json({status: 400, message: "You must provide a Password"});
    }

    //Req.body contains the form submit values
    var user = {
        username: req.body.username.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        info: {
            name: {
                firstname: req.body.firstname ? req.body.firstname : null,
                surname: req.body.surname ? req.body.surname : null
            },
            sex: req.body.sex ? req.body.sex : null,
            birthday: req.body.birthday ? req.body.birthday : null,
            contact: {
                address: req.body.address ? req.body.address : null,
                phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : null
            }
        }
    }

    // Calling the Service function with the new object from the Request Body
    try {
        var createdUser = await UserService.createUser(user);
        return res.status(201).json({status: 201, data: {createdUser: createdUser}, message:"Successfully Created User"});
    } catch (error) {

        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: 'User Creation unsuccessfully'});
    }
}

  /* =======================
  CHANGE PASSWORD FUNCTION
  ======================== */
exports.changePassword = async function(req, res, next) {
    // Id is necessary for the update

    if(!req.decoded.userId){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.decoded.userId;

    var user = {
        id,
        username: null,
        email: null,
        password: req.body.password,
        info: {
            name: {
                firstname: null,
                surname: null
            },
            avatar: null,
            sex: null,
            birthday: null,
            contact: {
                address: null,
                phoneNumber: null
            }
        },
        role: null
    }
    
    try {
        var updatedUser = await UserService.updateUser(user);
        return res.status(200).json({status: 200, data: {updatedUser: updatedUser}, message: "Succesfully Updated Password"});
    } catch (error) {
        return res.status(400).json({status: 400, message: error.message});
    }
}

  /* ========================
  UPDATE INFORMATION FUNCTION
  ========================= */
exports.updateUserInfo = async function(req, res, next) {

    // Id is necessary for the update

    if(!req.decoded.userId){
        return res.status(400).json({status: 400, message: "Id must be present"})
    }

    var id = req.decoded.userId;

    var user = {
        id,
        username: null,
        email: null,
        password: req.body.password ? req.body.password : null,
        info: {
            name: {
                firstname: req.body.firstname ? req.body.firstname : null,
                surname: req.body.surname ? req.body.surname : null
            },
            avatar: req.body.avatar ? req.body.avatar : null,
            sex: req.body.name ? req.body.sex : null,
            birthday: req.body.birthday ? req.body.birthday : null,
            contact: {
                address: req.body.address ? req.body.address : null,
                phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : null
            }
        },
        role: null
    }
    
    try {
        var updatedUser = await UserService.updateUser(user);
        updatedUser.password = null;
        return res.status(200).json({status: 200, data: {updatedUser: updatedUser}, message: "Succesfully Updated UserInfo"});
    } catch (error) {
        return res.status(400).json({status: 400, message: error.message});
    }
}

/* ================================
    Route to get user's profile data
================================== */
exports.getProfile = async function(req, res, next) {
// Search for user in database
try {
    var user = await UserService.findUserById(req.decoded.userId)
    if(!user) {
        return res.status(400).json({status: 400, success: false, message: "User not found"})
    }
    user.password = null;
    res.status(200).json({status: 200, data: {user: user}, message: "Successfully!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}
/* ====================
    UPLOAD AVATAR IMAGE
===================== */

exports.uploadAvatar = function (req, res, next) {
    if (!req.file) {
        return res.status(500).json({status: 500, message: "File is not uploaded"})
    }
    req.body.avatar = req.file.filename;
    next();
}
