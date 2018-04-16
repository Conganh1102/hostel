var express = require('express');

var router = express.Router();

var users = require('./api/users.route');
var admins = require('./api/admin.route');
var authentication = require('./api/authentication.route');
var images = require('./api/images.route');

router.use('/users', users);
// router.use('/admin', admins);
router.use('/authentication', authentication);
router.use('/images', images);

module.exports = router;