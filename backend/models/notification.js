const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    creator_external:{ type: mongoose.Schema.Types.ObjectId, ref:'External'},    // can be external or student
    creator_user: { type: mongoose.Schema.Types.ObjectId, ref:'User' },     
    receiver_external : { type: mongoose.Schema.Types.ObjectId, ref:'External'},
    receiver_user : { type: mongoose.Schema.Types.ObjectId, ref:'User' }, 
    text: String,
    ccreated_time: Date
});

module.exports = mongoose.model('Notification', notificationSchema);