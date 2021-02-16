const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');


const BookingSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    hotel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    arrival_date: {
        type: Date,
        required: true
    },
    departure_date: {
        type: Date,
        required: true
    },
    number_of_rooms: {
        type: Int32,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);