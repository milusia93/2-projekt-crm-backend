const mongoose = require('mongoose');

const Client = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    NIP: Number
}, 
{timestamps: true}
)

module.exports = mongoose.model('Client', Client);