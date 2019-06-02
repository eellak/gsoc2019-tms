const mongoose = require("mongoose");
const Thesis= require('../models/thesis');
const Student= require('../models/user');
const Request=require('../models/request');                       

                                        //check if student university is the same with thesis university

exports.checkUniversity= (req,res,next) => {
    var thesisId=req.params.thesisId;
    var studentId=req.userData.userId;
    Thesis.findById(thesisId)
        .select('university professor')
        .exec()
        .then(doc => {
            Student.findById(studentId)
            .select('university role')
            .exec()
            .then( user => {
                if(user.university.equals(doc.university) && user.role=='Student') {
                    console.log("okay in checkUniversity")
                    res.locals.professorId=doc.professor
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
        thesis: req.params.thesisId,
        accepted_fromStudent: false,
        accepted_fromProfessor: false
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
    
     

exports.delete_request= (req,res,next) => {
    // check if he owns the request
    Request.deleteOne({student:req.userData.userId, _id:req.params.requestId})
    .exec()
    .then(result => {
        if(result.deletedCount>0) { 
            res.status(200).json({
            message: "Request deleted"
            })
        }
        else { res.status(200).json({
            message:"No request found"
            })
        }
      })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.get_accepted_request=(req,res,next) => {
    Request.find({student:req.userData.userId , accepted_fromProfessor:true})
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

exports.post_accepted_request=(req,res,next) => {
    var updateObj={accepted_fromStudent:true};
    Request.findOneAndUpdate({_id:req.params.requestId , accepted_fromProfessor:true},updateObj, {new:true} )
        .exec()
        .then(docs => {
            if(docs!=null) {
                var updateThesis={student:docs.student , assigned:true};
                Thesis.findOneAndUpdate({_id:docs.thesis},updateThesis,{new:true})    
                .exec()
                .then(doc=> {
                    if(doc!=null)
                        res.status(200).json(doc);
                    else 
                        res.status(404).json({
                            message:'No entries found'
                        })
                })
            }
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

 