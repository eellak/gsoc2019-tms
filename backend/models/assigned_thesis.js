const mongoose = require('mongoose');
const Draft = require('./draft');

const assigned_thesisSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    thesis:{ type:mongoose.Schema.Types.ObjectId, ref:'Thesis'},
    student: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    professor: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    created_time: Date,
    published: Date, //only if it is completed
    completed: Boolean, // completed thesis for digital repository
    supervisor: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    draft: [{ type:mongoose.Schema.Types.ObjectId, ref:'Draft' }]
    });

module.exports = mongoose.model('Assigned_Thesis', assigned_thesisSchema,'assigned_thesis');