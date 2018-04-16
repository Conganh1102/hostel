// Getting the Newly created Mongoose Model we just created
var User = require('../models/user');
var fs = require('fs');
const directoryConfig = require('../config/directory');

// Saving the context of this module inside _the variable
_this = this;

// Async function to find the User by Id

exports.findUserById = async function(id, fields) {
    try {
        var user = await User.findOne({_id: id}).select(fields);
        return user;
    } catch (error) {
        throw Error('Error occured while finding User by Id: ' + error);
    }
}

// Async function to find the User by username

exports.findUserByUsername = async function(username, fields) {
    try {
        var user = await User.findOne({username: username}).select(fields);
        return user;
    } catch (error) {
        throw Error('Error occured while finding User by username: ' + error);
    }
}

exports.findUserByEmail = async function(email, fields) {
    try {
        var user = await User.findOne({email: email}).select(fields);
        return user;
    } catch (error) {
        throw Error('Error occured while finding User by email: ' + error);
    }
}

// Async function to check username and password in User List
exports.checkLogin = async function(username, password) {
    try {
        var user = await User.findOne({username: username});
        if(!user) {
            return null;
        } else if(!user.comparePassword(password)) {
            return null;
        }
        return user;
    } catch (error) {
        throw Error('Error occured while finding User by username: ' + error);
    }
}


// Async function to active a User by username

exports.activeUser = async function(username) {
    try {
        var user = await User.findOne({username: username});
        user.actived = true;
        var newUser = await user.save();
        return newUser;
    } catch (error) {
        throw Error('Error occured: ' + error);
    }
}


// Async function to get the User List
exports.getUsers = async function(query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error
    try {
        var users = await User.paginate(query, options);

        // Return the user list that was returned by the mongoose promise
        return users; 
    } catch (error) {
        
        // return a Error message describing the reson
        throw Error('Error while Paginate User: ' + error);
    }
}

exports.createUser = async function(user) {

    // Creating  a new Mongoose Object by using the new key word
    var newUser = new User({
        email: user.email,
        username: user.username,
        password: user.password,
        info: user.info
    });

    // Saving the user
    try {
        var savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        
        // return a Error message describing the reson
        console.log('' + error);
        throw Error('Error while creating User: ' + error);
    }
}

exports.updateUser = async function(user) {
    var id = user.id;

    try {
        
        // Find the old User Object by ID
        var oldUser = await User.findById(id);
    } catch (error) {
        throw Error('Error occured while Finding the User: ' + error);
    }

    // If no old User Object exists return false
    if(!oldUser) {
        return false;
    }

    // Edit the oldUser Object
    if (user.username) {
        oldUser.username = user.username;
    }
    if (user.email) {
        oldUser.email = user.email;
    }
    if (user.password) {
        oldUser.password = user.password;
    }
    if (user.info.name.firstname) {
        oldUser.info.name.firstname = user.info.name.firstname;
    }
    if (user.info.name.surname) {
        oldUser.info.name.surname = user.info.name.surname;
    }
    if (user.info.avatar) {
        var oldPath = directoryConfig.avatarUploadPath + oldUser.info.avatar;
        oldUser.info.avatar = user.info.avatar;
    }
    if (user.info.sex) {
        oldUser.info.sex = user.info.sex;
    }
    if (user.info.birthday) {
        oldUser.info.birthday = user.info.birthday;
    }
    if (user.info.contact.address) {
        oldUser.info.contact.address = user.info.contact.address;
    }
    if (user.info.contact.phoneNumber) {
        oldUser.info.contact.phoneNumber = user.info.contact.phoneNumber;
    }
    if (user.role) {
        oldUser.role = user.role;
    }
   
    try {
        var savedUser = await oldUser.save();
        oldUser.info.avatar = user.info.avatar;
        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
        }
        return savedUser;
    } catch (error) {
        throw Error('Error occured while updating the User: ' + error);
    }
}

exports.deleteUser = async function(id) {

    // Delete the User
    try {
        var deleted = await User.remove({_id: id});
        if(deleted.result.n === 0) {
            throw Error('User could not be deleted');
        }
    } catch (error) {
        throw Error('Error occured while delete the User: ' + error);
    }
}
