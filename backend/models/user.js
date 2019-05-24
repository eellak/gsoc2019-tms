const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true
        },
    name: string,
    lastname: string,
    role: string,
    id_university: { type: mongoose.Schema.Types.ObjectId, ref: 'University'},
    
    });

module.exports = mongoose.model('User', userSchema);