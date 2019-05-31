const mongoose = require("mongoose");
const Thesis= require('../models/thesis');
const Student= require('../models/user');
const Request=require('../models/request');                       

                                        //check if student university is the same with thesis university

exports.checkUniversity= (req,res,next) => {
    var thesisId=req.params.thesisId;
    var studentId=req.userData.userId;
    Thesis.findById(thesisId)
        .select('university owner')
        .exec()
        .then(doc => {
            Student.findById(studentId)
            .select('university role')
            .exec()
            .then( user => {
                if(user.university.equals(doc.university) && user.role=='Student') {
                    console.log("okay in checkUniversity")
                    res.locals.professorId=doc.owner
                    next();
                }
                else {
                    return res.status(401).json({
                        message: 'Auth failed not student or not same university'
                    })
                }
            })
        })
       };

                                        // Student apply for thesis. 
                                        //create a new request in db
exports.apply_thesis= (req,res,next) => {   
    // check if student has already applied for the thesis
    Request.find({student : req.userData.userId, thesis: req.params.thesisId })
    .exec()
    .then(doc => {
        if(doc.length>0) {
            return res.status(401).json({
                message: 'You have already applied for this thesis'
            })
        }
    })
    var thesisId=req.params.thesisId;
    const request = new Request({
        _id: new mongoose.Types.ObjectId(),
        student: req.userData.userId,
        professor: res.locals.professorId,
        thesis: req.params.thesisId
      });
      request
        .save() 
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Created request successfully",
          })
          })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    };

    exports.isUser=(req,res,next) => {
        if(req.userData.userId==req.userData.userId)
            {
                console.log("userId validated")
                return next();
            }
        else 
            res.status(401).json({
                message: 'Not authorized: userId does not equals to tokens userId'
            })
    }
    
    exports.get_request= (req,res,next) => {
        Request.find({student:req.userData.userId})
        .populate('thesis')
        .exec()
        .then(docs => { console.log(req.userData.userId)
              if(docs!=null)
                res.status(200).json(docs);
              else
                res.status(404).json({
                    message: 'No entries found'
                })
            })
            .catch(err => {
              console.log(err+"wjat");
              res.status(500).json({
                error: err
              });
            });
        };
    
     

