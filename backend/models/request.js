const mongoose = require('mongoose');

//students requests for thesis selection 
const requestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    student: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    professor: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    thesis: {type: mongoose.Schema.Types.ObjectId, ref:'Thesis'},
    text: String,
    created_time: Date,
    accepted_fromProfessor:Boolean
    });

module.exports = mongoose.model('Request', requestSchema,'requests');