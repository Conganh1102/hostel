/* ===================
   Import Node Modules
=================== */

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');


const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    roomId: String,
    poster: {
        type: String,
        required: true
    },
    room_info: {
        contact: { owner: String, phone: String },
        address: { type: String, required: true },
        position: {lat: {  type: String,  required: true},lng: {type: String,required: true }},
        floor: {type: Number,required: true,},
        area: { type: Number, required: true },
        price: { type: Number, required: true},
        images: { type: String },
        other_info: { type: String }
    },
    createAt: { type: Date,default: Date.now()},
    status: { type: Boolean, default: true }
}, {
    usePushEach: true
});


// Export Module/Schema
module.exports = mongoose.model('Post', postSchema);