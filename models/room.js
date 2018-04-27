/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
var mongoosePaginate = require('mongoose-paginate');

roomSchema = new Schema({
    houseId: {
        type: String,
        required: true
    },
    floor: {
        type: Number,
        required: true,
    },
    area: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    self_contained: {
        type: Boolean,
        required: true
    },
    kitchen: {
        type: String,
        required: true
    },
    images: [
        {
            type: String
        }
    ],
    other_info: {
        type: String
    },
    status: {
        type: String,
        default: 'empty'
    }
}, {
    usePushEach: true
});

rommSchema.plugin(mongoosePaginate);

// Export Module/Schema
module.exports = mongoose.model('Room', roomSchema);

