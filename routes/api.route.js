var express = require('express');

var router = express.Router();

var users = require('./api/users.route');
var admins = require('./api/admin.route');
var authentication = require('./api/authentication.route');
var images = require('./api/images.route');
var houses = require('./api/houses.route');

router.use('/users', users);
// router.use('/admin', admins);
router.use('/authentication', authentication);
router.use('/images', images);
router.use('/houses', houses);

module.exports = router;