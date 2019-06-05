const mongoose = require('mongoose');
 

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true
        },
    name: String,
    lastname: String,
    role: { 
            type: String,
            enum: ['Guest','Admin','Professor','Student','Secreteriat']
    },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University'},
    
    });

module.exports = mongoose.model('User', userSchema);