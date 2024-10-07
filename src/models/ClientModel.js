const mongoose = require('mongoose');

const Client = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        street: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    nip: String
}, 
{timestamps: true}
)

module.exports = mongoose.model('Client', Client);