/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
var mongoosePaginate = require('mongoose-paginate');

const houseSchema = new Schema({
    tenantId: { type: String, required: true },
    address: { type: String, required: true },
    position: { lat: { type: String, required: true }, lng: { type: String, required: true } },
    info: { type: String, required: true }
    
}, {
    usePushEach: true
});
houseSchema.plugin(mongoosePaginate);
// Export Module/Schema
module.exports = mongoose.model('House', houseSchema);