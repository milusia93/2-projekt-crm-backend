const mongoose = require('mongoose');

const Action = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },

    actionType: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    specificClient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Action', Action);