const mongoose = require('mongoose');

//students requests for thesis selection 
const requestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id_student: { type: mongoose.SchemaType.ObjectId, ref:'User'},
    id_professor: { type:mongoose.SchemaType.ObjectId, ref:'User'},
    id_thesis: {type:mongoose.SchemaType.ObjectId, ref:'Thesis'},
    text: String
    });

module.exports = mongoose.model('Request', requestSchema);