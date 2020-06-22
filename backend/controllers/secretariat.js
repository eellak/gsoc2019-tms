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
          res.status(400).json({message:'You are not a secretariat'})
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
    .populate('professor')
    .populate({path:'thesis' , select: '_id title'})
    .populate({path:'supervisors', select:'name lastname'})
    .populate({path:'external_supervisors', select:'name lastname'})
    .select('student thesis created_time professor supervisors external_supervisors')
    .exec()
    .then( result => { 
        var assigned_length=result.length;
        var student_array= [];
        var export_data=[];
        for (var i = 0; i < result.length; i++) {
            result[i].student.thesis_id=result[i].thesis._id;
            result[i].student.thesis_title=result[i].thesis.title;
            student_array.push(result[i].student);
            var sFullname = [result[i].student.name, result[i].student.lastname];
            var pFullname = [result[i].professor.name, result[i].professor.lastname];           
            var email = result[i].student.email
            var am = email.substring(0, email.lastIndexOf("@"));
            var created = result[i].created_time;
            var date = created.getTime();
            var fulldate = created.toDateString();
            if(result[i].supervisors[0] && result[i].supervisors[1]){
                var supFullname = [result[i].supervisors[0].name, result[i].supervisors[0].lastname];
                var supFullname2 = [result[i].supervisors[1].name, result[i].supervisors[1].lastname];
                export_data.push({ ΟΝΟΜΑΤΕΠΩΝΥΜΟ:sFullname.join(' '), ΑΜ:am, ΤΙΤΛΟΣ:result[i].student.thesis_title, date:date, ΗΜΕΡΟΜΗΝΙΑ:fulldate, ΕΠΙΒΛΕΠΩΝ:pFullname.join(' '), ΜΕΛΟΣ1:supFullname.join(' '), ΜΕΛΟΣ2:supFullname2.join(' ')});
            }else if(result[i].external_supervisors[0] && result[i].external_supervisors[1]){
                var exFullname = [result[i].external_supervisors[0].name, result[i].external_supervisors[0].lastname];
                var exFullname2 = [result[i].external_supervisors[1].name, result[i].external_supervisors[1].lastname];
                export_data.push({ ΟΝΟΜΑΤΕΠΩΝΥΜΟ:sFullname.join(' '), ΑΜ:am, ΤΙΤΛΟΣ:result[i].student.thesis_title, date:date, ΗΜΕΡΟΜΗΝΙΑ:fulldate, ΕΠΙΒΛΕΠΩΝ:pFullname.join(' '), ΜΕΛΟΣ1:exFullname.join(' '), ΜΕΛΟΣ2:exFullname2.join(' ')});
            }else if(result[i].supervisors[0] && result[i].external_supervisors[0]){
                var fullname = [result[i].supervisors[0].name, result[i].supervisors[0].lastname];
                var fullname2 = [result[i].external_supervisors[0].name, result[i].external_supervisors[0].lastname];
                export_data.push({ ΟΝΟΜΑΤΕΠΩΝΥΜΟ:sFullname.join(' '), ΑΜ:am, ΤΙΤΛΟΣ:result[i].student.thesis_title, date:date, ΗΜΕΡΟΜΗΝΙΑ:fulldate, ΕΠΙΒΛΕΠΩΝ:pFullname.join(' '), ΜΕΛΟΣ1:fullname.join(' '), ΜΕΛΟΣ2:fullname2.join(' ')});
            }else{
                export_data.push({ ΟΝΟΜΑΤΕΠΩΝΥΜΟ:sFullname.join(' '), ΑΜ:am, ΤΙΤΛΟΣ:result[i].student.thesis_title, date:date, ΗΜΕΡΟΜΗΝΙΑ:fulldate, ΕΠΙΒΛΕΠΩΝ:pFullname.join(' ')});
            }
        }
         
        User.find({role:'Student' , university:req.userData.university, _id: { $nin: student_array  } })
        .exec()
        .then(docs => { 
                const result= {
                    assigned:student_array,
                    not_assigned: docs,
                    count: docs.length+ assigned_length,
                    export_data: export_data
                }
                res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        })
    }).catch(err => {
        console.log("Error in fetching students: " + err);
    })
}

exports.get_professors= (req,res,next) => {
    var perPage = 6
    var page = req.query.page || 1  
    var count;
    var query={role:'Professor' , university:req.userData.university}
     User.countDocuments(query)
    .then( result => {
        count=result
        User.find(query)
        .select("email name lastname")
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