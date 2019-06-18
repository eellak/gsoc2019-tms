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
                res.locals.university=doc.university;
                console.log('Auth passed: User is secretariat')
                return next();
            }
            else {
                return res.status(401).json({
                    message: 'Auth failed not Secretariat'
                })
            }
        }
        else { res.status(401).json({
                 message: 'Auth failed user not found'
            })
        }
    })
    .catch(err => {
        res.status(500).json({error:err});
    })
}

exports.notify_student = (req, res, next) => {
    Student.findById({ _id: req.params.studentId })
        .exec()
        .then(doc => {
            if (doc.university.equals(res.locals.university)) {
                const notification = new Notification({
                    _id: new mongoose.Types.ObjectId(),
                    creator_user: req.userData.userId,
                    receiver_user: req.params.studentId,
                    created_time: new Date(),
                    text: req.body.text
                });
                notification
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "Created notification successfully",
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error:err
                        });
                    })
            }
            else {
                res.status(404).json({ message: "The student doesnt belong to your university" })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}