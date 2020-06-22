const mongoose = require('mongoose');

//requests for supervision thesis

const supervision_requestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    student: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    professor: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    dst_professor: { type: mongoose.Schema.Types.ObjectId, refPath: 'supervisorModel'},
    supervisorModel: {
        type: String,
        enum: ['User', 'External']
    },
    assigned_thesis: {type: mongoose.Schema.Types.ObjectId, ref:'Assigned_Thesis'},
    text: String,
    created_time: Date,
    });

module.exports = mongoose.model('Supervision_Request', supervision_requestSchema);