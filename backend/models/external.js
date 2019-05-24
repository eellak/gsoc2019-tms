const mongoose = require('mongoose');

const externalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true
        },
    password: { type: String, required: true },
    name: String,
    lastname: String,
    role: {type: String, default: "external" },

    });

module.exports = mongoose.model('External', externalSchema);