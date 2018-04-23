/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
var mongoosePaginate = require('mongoose-paginate');

houseSchema = new Schema({
    tenantId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    position: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    electricity_price: {
        type: String
    },
    water_price: {
        type: String
    }
    
}, {
    usePushEach: true
});

houseSchema.plugin(mongoosePaginate);

// Export Module/Schema
module.exports = mongoose.model('House', houseSchema);