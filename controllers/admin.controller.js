// Accessing the Service the we just created

var UserService = require('../services/users.service');
var Postservice = require('../services/posts.service');
var UserController = require('./users.controller');


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

exports.addUser = async function(req, res, next) {
    UserController.register(req, res, next);
}

exports.editUser = async function(req, res, next) {
    UserController.updateUserInfo(req, res, next);
}

exports.deleteUser = async function(req, res, next) {
    if (!req.body.userId) {
        return res.status(400).json({status: 400, message: "UserId must be presented"});
    }
    try {
        await UserService.deleteUser(req.body.userId);
        return res.status(200).json({status: 200, message: "Successfully"});
    } catch (error) {
        return res.status(500).json({status: 500, message: error.message});
    }
}

exports.grantPower = async function(req, res, next) {
    if (!req.body.userId) {
        return res.status(400).json({status: 400, message: "UserId must be presented"});
    }
    if (!req.body.role) {
        return res.status(400).json({status: 400, message: "User Role must be presented"});
    }

    var id = req.decoded.userId;
    var role = req.body.role;

    var user = {
        id,
        username: null,
        email: null,
        password: null,
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
        role: role
    }

    try {
        var updateUser = await UserService.updateUserInfo(user);
        return res.status(200).json({status: 200, message: "Successfully"});
    } catch (error) {
        return res.status(500).json({status: 500, message: error.message});
    }
}

exports.acceptPost = async function(req, res, next) {
    if (req.body.postId) {
        return res.status(400).json({status: 400, message: "PostId must be presented"});
    }

    var id = req.body.postId;

    var post = {
        id,
        post_info: null,
        room_info: null,
        status: true
    }

    try {
        var updatedPost = await Postservice.updatePost()
    } catch (error) {
        return res.status(500).json({status: 500, message: error.message});
    }
}

