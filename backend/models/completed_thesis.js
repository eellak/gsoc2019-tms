
const mongoose = require('mongoose');



const completedThesisSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    file_data: Buffer, // to store pdf file
    file_name: String, // pdf name file
    created_time : Date,
    thesis: {type: mongoose.Schema.Types.ObjectId, ref:'Assigned_Thesis'},

})

module.exports = mongoose.model('CompletedThesis', completedThesisSchema,'completed_thesis');