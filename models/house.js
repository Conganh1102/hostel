import { Double } from '../../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bson';

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
        type: Strring,
        required: true
    },
    position: {
        lat: {
            type: Double,
            required: true
        },
        lng: {
            type: Double,
            required: true
        }
    },
    roomsId: [
        {
            type: String,
            required: true
        }
    ],
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