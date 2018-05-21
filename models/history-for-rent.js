/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
var mongoosePaginate = require('mongoose-paginate');

const historyForRentSchema = new Schema({
    roomId: {
        type: String,
        required: true
    },
    history: [
        {
            date_start: {
                type: Date,
                default: Date.now()
            },
            date_end: Date,
            renter_info: String,
            note: [
                {
                    date_note: Date,
                    content: String
                }
            ]
        }
    ]
}, {
    usePushEach: true
});    

// Export Module/Schema
module.exports = mongoose.model('HistoryForRent', historyForRentSchema);