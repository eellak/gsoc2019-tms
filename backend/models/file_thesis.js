
const mongoose = require('mongoose');



const thesisSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    file_data: Buffer, // to store pdf file
    file_name: String, // pdf name file
    thesis: {type: mongoose.Schema.Types.ObjectId, ref:'Thesis'}
})

module.exports = mongoose.model('FileThesis', thesisSchema,'file_thesis');