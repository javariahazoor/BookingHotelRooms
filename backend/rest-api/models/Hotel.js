const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');


const HotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    number_of_rooms: {
        type: Int32,
        required: true
    },
    price: {
        type: Int32,
        required: true
    }
    
});

module.exports = mongoose.model('Hotel', HotelSchema);