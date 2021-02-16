const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');

const CustomerSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: Int32,
        required: true
    },
    email: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);