// Accessing the Service the we just created

var PostService = require('../services/posts.service');

// saving the context of this module inside _the variable

_this = this;

exports.getPosts = async function (req, res, next) {
    let query = {
        status: true
    };
    try {
        var posts = await PostService.getPosts(query);
        // Return the user list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({
            status: 200,
            data: posts,
            message: 'Succesfully Posts Received'
        });
    } catch (error) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
}

exports.getOwnPosts = async function (req, res, next) {
    try {
        let posts = await PostService.getOwnPosts(req.decoded.userId);
        // Return the user list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({
            status: 200,
            data: posts,
            message: 'Succesfully Posts Received'
        });
    } catch (error) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
}

exports.getSinglePost = async function (req, res, next) {
    try {
        var post = await PostService.findPostById(req.params.id);
        // Return the user list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({
            status: 200,
            data: post,
            message: 'Succesfully Posts Received'
        });
    } catch (error) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
}

exports.createPost = async function (req, res, next) {
    var post = {
        title: req.body.title,
        poster: req.decoded.userId,
        roomId: req.body.roomId ? req.body.roomId : null,
        room_info: {
            contact: {
                owner: req.body.owner,
                phone: req.body.phone
            },
            address: req.body.address,
            position: {
                lat: req.body.lat,
                lng: req.body.lng
            },
            floor: req.body.floor,
            area: req.body.area,
            price: req.body.price,
            images: req.body.images ? req.body.images : null,
            other_info: req.body.other_info ? req.body.other_info : null

        }
    }

    try {
        var createdPost = await PostService.createPost(post);
        return res.status(201).json({
            status: 201,
            data: createdPost,
            message: "Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }

}

exports.updatePost = async function (req, res, next) {

}

exports.deletePost = async function (req, res, next) {
    // Id is necessary for the update

    if (!req.decoded.userId) {
        return res.status(400).json({
            status: 400.,
            message: "UserId must be present"
        });
    }

    if (!req.params.postId) {
        return res.status(400).json({
            status: 400.,
            message: "PostId must be present"
        });
    }

    try {
        let post = await PostService.findPostById(req.params.postId);
        if (post.poster !== req.decoded.userId) {
            return res.status(403).json({
                status: 403,
                message: "You are not poster"
            });
        }
        await PostService.deletePost(req.params.postId);
        return res.status(200).json({status: 200, message: 'the post is deleted'});
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}
exports.putDownPost = async function (req, res, next) {
    // Id is necessary for the update

    if (!req.decoded.userId) {
        return res.status(400).json({
            status: 400.,
            message: "UserId must be present"
        });
    }

    if (!req.params.roomId) {
        return res.status(400).json({
            status: 400.,
            message: "RoomId must be present"
        });
    }

    try {
        // let post = await PostService.findPostById(req.params.roomId);
        // if (post.poster !== req.decoded.userId) {
        //     return res.status(403).json({
        //         status: 403,
        //         message: "You are not poster"
        //     });
        // }
        await PostService.putDownPost(req.params.roomId);
        return res.status(200).json({status: 200, message: 'the post is deleted'});
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}

exports.uploadRoomImage = function (req, res, next) {
    // console.log(req);
    if (!req.file) {
        return res.status(500).json({
            status: 500,
            message: "File is not uploaded"
        })
    }
    req.body.avatar = req.file.filename;
    res.status(201).json({
        status: 201,
        filename: req.file.filename,
        message: "Image is saved"
    });
}