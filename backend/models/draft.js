const mongoose = require('mongoose');

const draftSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: String,
    data: Buffer,
    created_time: Date,
    assigned_thesis: { type: mongoose.Schema.Types.ObjectId, ref:'Assigned_Thesis'},
    });

module.exports = mongoose.model('Draft', draftSchema,'drafts');