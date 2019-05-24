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
    id_university: { type: mongoose.Schema.Types.ObjectId, ref: 'University'},
    id_student: { type: mongoose.SchemaType.ObjectId, ref:'User'},
    id_owner: { type:mongoose.SchemaType.ObjectId, ref:'User'},
    id_creator_student: { type:mongoose.SchemaType.ObjectId, ref:'User' },
    id_creator_external:{ type:mongoose.SchemaType.ObjectId, ref:'External'},
    id_supervisor: [{ type : mongoose.SchemaType.ObjectId, ref: 'User' }]
    });

module.exports = mongoose.model('Thesis', thesisSchema);