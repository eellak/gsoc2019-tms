const mongoose = require('mongoose');
 

const time_periodSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'External'},
    apply_period_start: Date,
    apply_period_end: Date,
    apply_period_valid : Boolean,
    create_thesis_period_start : Date,
    create_thesis_period_end: Date,
    create_thesis_period_valid: Boolean
})

module.exports = mongoose.model('Time_Period', time_periodSchema,'time_periods');