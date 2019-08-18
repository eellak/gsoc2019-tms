const mongoose = require("mongoose");
const Student= require('../models/user');
const Time_period=require("../models/time_period");
const Notification=require("../models/notification");
const Secretariat=require("../models/user");
const Assigned_Thesis=require('../models/assigned_thesis');
const User=require('../models/user');



exports.is_secretariat=(req,res,next) => {
        if(req.userData.role!='Secretariat') {
          console.log("You are not a secretariat")
          res.status(400).json({message:'You are not a student'})
        }
        else 
          next();
}

exports.get_students_pages=(req,res,next) => {
    var perPage = 6
    var page = req.query.page || 1  
    var count;
    var query={role:'Student' , university:req.userData.university}
     User.countDocuments(query)
    .then( result => {
        count=result
        User.find(query)
        .select("email university name lastname")
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec()
        .then(docs => { 
            if(docs!=null) {
                const response = {
                    docs:docs,
                    count:count,
                    pages: Math.ceil(count / perPage),
                }
             res.status(200).json(response);
            }
            else
                res.status(404).json({
                    message: 'No entries found'
                })
            })
        })
            .catch(err => {
            console.log(err+"wjat");
            res.status(500).json({
                error: err
            });
            });
        };

exports.get_students=(req,res,next) => {
    Assigned_Thesis.find({university:req.userData.university})
    .lean()
    .populate('student')
    .populate({path:'thesis' , select: '_id title'})
    .select('student thesis')
    .exec()
    .then( result => { 
        var assigned_length=result.length;
        var student_array= []
        for (var i = 0; i < result.length; i++) {
            result[i].student.thesis_id=result[i].thesis._id 
            result[i].student.thesis_title=result[i].thesis.title 
             student_array.push(result[i].student);
        }
         
        User.find({role:'Student' , university:req.userData.university, _id: { $nin: student_array  } })
        .exec()
        .then(docs => { 
                const result= {
                    assigned:student_array,
                    not_assigned: docs,
                    count: docs.length+ assigned_length
                }
                res.status(200).json(result)
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
                            message: "Notification successfully created"
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