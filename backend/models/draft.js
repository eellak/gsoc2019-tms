const mongoose = require('mongoose');

//students requests for thesis selection 
const draftSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    student: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    professor: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    thesis: {type: mongoose.Schema.Types.ObjectId, ref:'Thesis'},
    text: String,
    created_time: Date
    });

module.exports = mongoose.model('Draft', draftSchema,'drafts');