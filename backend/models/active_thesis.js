const mongoose = require('mongoose');
const Draft = require('./draft');

const active_thesisSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    thesis:{ type:mongoose.Schema.Types.ObjectId, ref:'Thesis'},
    student: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    created_time: Date,
    published: Date, //only if it is completed
    completed: Boolean, // completed thesis for digital repository
    supervisor: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    draft: [{ type:mongoose.Schema.Types.ObjectId, ref:'Draft' }]
    });

module.exports = mongoose.model('Active_Thesis', active_thesisSchema,'active_thesis');