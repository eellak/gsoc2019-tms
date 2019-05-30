const mongoose = require("mongoose");
const Thesis= require('../models/thesis');
const Student= require('../models/user');
const Request=require('../models/request');                       


exports.checkUniversity= (req,res,next) => {
    var thesisId=req.params.thesisId;
    var studentId=req.params.userId;
    Thesis.findById(thesisId)
        .select('id_university','id_owner')
        .exec()
        .then(doc => {
            Student.findById(studentId)
            .select('id_university','role')
            .exec()
            .then( user => {
                if(user.id_university==doc.id_university && user.role=='Student') {
                    console.log("okay in checkUniversity")
                    res.locals.professorId=doc.id_owner
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

exports.apply_thesis= (req,res,next) => {  
    var thesisId=req.params.thesisId;
    const request = new Request({
        _id: new mongoose.Types.ObjectId(),
        id_student: req.params.userId,
        id_professor: res.locals.professorId,
        id_thesis: req.params.thesisId
      });
      request
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Created product successfully",
            createdProduct: {
              name: result.name,
              price: result.price,
              _id: result._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/products/" + result._id
              }
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    };
                                        // Student apply for thesis. 
                                        //check if student university is the same with thesis university
                                        //create a new request in db


