var Post = require('../models/post');

_this = this;

exports.findPostById = async function(id, fields) {
    try {
        var post = await Post.findOne({_id: id}).select(fields);
        return post;
    } catch (error) {
        throw Error('Error occured while finding Post by Id: ' + error);
    }
}

// Async function to get the Post List
exports.getPosts = async function(query, fields) {

    // Try Catch the awaited promise to handle the error
    try {
        var posts = await Post.find({status: true}).select(fields);

        // Return the user list that was returned by the mongoose promise
        return posts; 
    } catch (error) {
        
        // return a Error message describing the reson
        throw Error('Error while find Post: ' + error);
    }
}

exports.getOwnPosts = async function(posterId, fields) {
    // Try Catch the awaited promise to handle the error
    try {
        var posts = await Post.find({poster: posterId, status: true}).select(fields);

        // Return the user list that was returned by the mongoose promise
        return posts; 
    } catch (error) {
        
        // return a Error message describing the reson
        throw Error('Error while find Post: ' + error);
    }
}

exports.createPost = async function(post) {
    var newPost = new Post({
        title: post.title,
        poster: post.poster,
        roomId: post.roomId,
        room_info: post.room_info
    });
    try {
        var createdPost = await newPost.save();
        return createdPost;
    } catch (error) {
        throw Error('Error occured while creating Post: ' + error);
    }
}

exports.updatePost = async function(post) {
    var id = post.id;

    try {
        var oldPost = await Post.findById(id);
    } catch (error) {
        throw Error('Error occured while finding Post by Id: ' + error);
    }

    if (post.title) {
        oldPost.title = post.title;
    }

    if (post.roomId) {
        oldPost.roomId = post.roomId;
    }
    if (post.room_info) {
        oldPost.room_info = post.room_info;
    }
    if (post.status) {
        oldPost.status = post.status;
    }

    try {
        var updatedPost = await oldPost.save();
    } catch (error) {
        throw Error('Error occured while saving post: ' + error);
    }

    //
}

exports.deletePost = async function(id) {
    // Delete the post
    try {
        var deleted = await Post.remove({_id: id});
        if(deleted.n === 0) {
            throw Error('Post could not be deleted');
        }
    } catch (error) {
        throw Error('Error occured while delete the Post: ' + error);
    }
}

exports.putDownPost = async function(roomId) {
    // Delete the post
    try {
        var deleted = await Post.remove({roomId: roomId});
        if(deleted.n === 0) {
            throw Error('Post could not be deleted');
        }
    } catch (error) {
        throw Error('Error occured while delete the Post: ' + error);
    }
}