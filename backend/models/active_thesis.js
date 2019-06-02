const mongoose = require('mongoose');

const thesisSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    thesis:{ type:mongoose.Schema.Types.ObjectId, ref:'Thesis'},
    student: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    created_time: Date,
    published: Date, //only if it is completed
    completed: Boolean, // completed thesis for digital repository
    supervisor: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }]
    });

module.exports = mongoose.model('Active_Thesis', thesisSchema,'active_thesis');