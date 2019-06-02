const mongoose = require('mongoose');

const draftSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: String,
    created_time: Date
    });

module.exports = mongoose.model('Draft', draftSchema,'drafts');