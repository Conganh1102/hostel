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

exports.createPost = async function(post) {
    var newPost = new Post({
        post_info: post.post_info,
        room_info: post.room_info
    });
    try {
        var createdPost = await newPost.save();
        return createdPost;
    } catch (error) {
        throw Error('Error occured while creating House: ' + error);
    }
}

exports.updatePost = async function(post) {
    var id = post.id;

    try {
        var oldPost = await Post.findById(id);
    } catch (error) {
        throw Error('Error occured while finding Post by Id: ' + error);
    }

    // Edit old post 

    //
}

exports.deletePost = async function(id) {
    
    // Delete the post
    try {
        var deleted = await Post.remove({_id: id});
        if(deleted.result.n === 0) {
            throw Error('User could not be deleted');
        }
    } catch (error) {
        throw Error('Error occured while delete the Post: ' + error);
    }
}