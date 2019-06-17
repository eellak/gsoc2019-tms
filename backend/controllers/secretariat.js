const mongoose = require("mongoose");
const Student= require('../models/user');
const Time_period=require("../models/time_period");
const Notification=require("../models/notification");
const Secretariat=require("../models/user");



exports.is_secretariat=(req,res,next) => {
    Secretariat.findById({_id:req.userData.userId})
    .exec()
    .then(doc => {
        if(doc) {
            if(doc.role=='Secretariat') { 
                console.log('Auth passed: User is secretariat')

                return next();
            }
        }
            return res.status(401).json({
                message: 'Auth failed not Secretariat'
            })
    })
    .catch(err => {})
}

exports.notify_student=(req,res,next) => {
    Student.findById({_id:req.params.studentId})
    .exec()
    .then(doc => {

    })

}