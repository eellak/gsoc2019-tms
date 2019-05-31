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

exports.delete_request=(req,res,next) => {
    // check if he owns the request
    Request.deleteOne({professor:req.userData.userId, _id:req.params.requestId})
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