/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
var mongoosePaginate = require('mongoose-paginate');

const roomSchema = new Schema({
    houseId: {type: String, required: true },
    roomNumber: { type: String, required: true },
    floor: {type: Number,  required: true,},
    area: {type: Number,required: true},
    price: { type: Number, required: true },
    images: {  type: String  },
    other_info: {  type: String },
    status: {  type: String, default: 'EMPTY' }
}, {
    usePushEach: true
});

roomSchema.plugin(mongoosePaginate);

// Export Module/Schema
module.exports = mongoose.model('Room', roomSchema);

