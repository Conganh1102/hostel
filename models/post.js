const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const postSchema = new Schema({
    post_info: {
        userId: {
            type: String
        },
        roomId: {
            type: String
        }
    },

    room_info: {
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
        images: [{
            type: String
        }],
        other_info: {
            type: String
        }
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
}, {
    usePushEach: true
});

// Export Module/Schema
module.exports = mongoose.model('Post', postSchema);