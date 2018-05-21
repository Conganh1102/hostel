var express = require('express');
const storage = require('../../config/fileUpload');
var multer = require('multer');
var uploadRoomImage = multer({ storage: storage.storageRoomImage});

var router = express.Router();

// Getting the Controllers that we just created
var PostController = require('../../controllers/posts.controller');
var AuthenticationController = require('../../controllers/authentication.controller');


router.get('/get-posts', PostController.getPosts);
router.get('/get-single-post/:id', PostController.getSinglePost);
router.get('/get-own-posts', [AuthenticationController.CheckToken, PostController.getOwnPosts]);
router.post('/create-post', [AuthenticationController.CheckToken, PostController.createPost]);
router.post('/upload-room-image', [uploadRoomImage.single('images'), PostController.uploadRoomImage]);
router.put('/update-post', [AuthenticationController.CheckToken, PostController.updatePost]);
router.delete('/delete-post/:postId', [AuthenticationController.CheckToken, PostController.deletePost]);
router.delete('/put-down-post/:roomId', [AuthenticationController.CheckToken, PostController.putDownPost]);

// Export the Router
module.exports = router;