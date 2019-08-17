const mongoose = require('mongoose');

const pendingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    creator:{ type: mongoose.Schema.Types.ObjectId, ref:'External'},    // can be external or student
    thesis: { type: mongoose.Schema.Types.ObjectId, ref:'Thesis' },     
    professor: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    created_time : Date
})

module.exports = mongoose.model('Pending', pendingSchema,'pending');