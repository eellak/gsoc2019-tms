const mongoose = require("mongoose");
const Student= require('../models/user');
const Time_period=require("../models/time_period");
const Notification=require("../models/notification");
const Secretariat=require("../models/user");
const Assigned_Thesis=require('../models/assigned_thesis');




exports.is_secretariat=(req,res,next) => {
        if(req.userData.role!='Secretariat') {
          console.log("You are not a secretariat")
          res.status(400).json({message:'You are not a student'})
        }
        else 
          next();
}


exports.get_students_not_assigned=(req,res,next) => {
    Assigned_Thesis.find({university:req.userData.university})
    .select('student ')
    .exec()
    .then( result => { console.log(result)
        var student_array= []
        for (var i = 0; i < result.length; i++) {
             student_array.push(result[i].student);
        }
        Student.find({role:'Student' , university:req.userData.university, _id: { $nin: student_array  } })
        .exec()
        .then(docs => { 
            if(docs.length>0)
                res.status(200).json(docs)
            else {
                res.status(200).json({message:'All students have assigned for thesis'})
            }
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        })
    })
}

exports.notify_student = (req, res, next) => {
    Student.findById({ _id: req.params.studentId , role:'Student' ,university:req.userData.university })
        .exec()
        .then(doc => {
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
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}