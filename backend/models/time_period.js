const mongoose = require('mongoose');
 

const time_periodSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'External'},
    application_period_start: Date,
    application_period_end: Date,
 
})

module.exports = mongoose.model('Time_Period', time_periodSchema,'time_periods');