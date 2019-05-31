const mongoose = require("mongoose");
const Thesis= require('../models/thesis');
const Professor= require('../models/user');
const Request=require('../models/request');    



exports.get_request= (req,res,next) => {
    Request.find({professor:req.userData.userId})
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

exports.delete_request=(req,res,next) => { //notification system not implemented yet
    // check if he owns the request
    Request.deleteOne({professor:req.userData.userId, _id:req.params.requestId})
    .exec()
    .then(result => {
        if(result.deletedCount>0) { 
            res.status(200).json({
            message: "Request deleted"
            })
        }
        else { res.status(404).json({
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

exports.get_thesis= (req,res,next) => {
    Thesis.find({professor:req.userData.userId})
    .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          thesis: docs.map(doc => {
            return {
              title: doc.title,
              description: doc.description,
              prerequisites: doc.prerequisites,
              _id: doc._id,
              created_time: doc.created_time,
              published: doc.published,
              student: doc.student,
              university: doc.university,
              professor: doc.professor,
              creator_student: doc.creator_student,
              creator_external: doc.creator_external,
              request: {
                type: "GET",
                url: "http://localhost:3000/thesis/" + doc._id
              }
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err+"wjat");
        res.status(500).json({
          error: err
        });
      });
}


exports.get_thesis_byId= (req,res,next) => {
    Thesis.findOne({_id:req.params.thesisId, professor:req.userData.userId})
    .exec()
      .then(doc => {
        if(doc)
            res.status(200).json(doc);
        else 
            res.status(404).json({
                message: 'No thesis found'
            })
        })
      .catch(err => {
        console.log(err+"wjat");
        res.status(500).json({
          error: err
        });
      });
}

exports.delete_thesis=(req,res,next) => {
     Thesis.deleteOne({professor:req.userData.userId, _id:req.params.thesisId})
     .exec()
     .then(result => {
         if(result.deletedCount>0) { 
             res.status(200).json({
             message: "Thesis deleted"
             })
         }
         else { res.status(404).json({
             message:"No thesis found"
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
 

 exports.create_thesis= (req,res,next) => {
    const thesis = new Thesis({
        _id: new mongoose.Types.ObjectId(),
        professor: req.userData.userId,
        title: req.body.title,
        description: req.body.description,
        prerequisites: req.body.prerequisites,
        tags: req.body.tags,
        created_time: req.body.created_time,
        completed: false,
        pending: false,
        university: res.locals.university
      });
      thesis
        .save() 
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Created thesis successfully",
          })
          })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    };
 

exports.isProfessor=(req,res,next) => {
    Professor.findById({_id:req.userData.userId})
    .select('role university')
    .exec()
    .then(doc => {
        if(doc) {
            if(doc.role=='Professor') { 
                console.log('Auth passed: User is professor')
                res.locals.university=doc.university
                console.log(doc.university)
                return next();
            }
        }
            return res.status(401).json({
                message: 'Auth failed not Professor'
            })
    })
}