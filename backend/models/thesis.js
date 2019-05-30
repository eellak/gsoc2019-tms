const mongoose = require('mongoose');

const thesisSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { 
        type: String, 
        required: true, 
    },
    description: String,
    prerequisites: String,
    tags: [String],
    created_time: Date,
    published: Date, //only if it is completed
    pending: Boolean, // external,student wait for approval from professor. 
    completed: Boolean, // completed thesis for digital repository
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University'},
    student: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    owner: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    creator_student: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    creator_external:{ type: mongoose.Schema.Types.ObjectId, ref:'External'},
    supervisor: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }]
    });

module.exports = mongoose.model('Thesis', thesisSchema,'thesis');