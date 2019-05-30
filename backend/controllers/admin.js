const mongoose = require("mongoose");
const Thesis= require('../models/thesis');
const External= require('../models/external');
const Request=require('../models/request');                       
const User=require('../models/user');

exports.is_admin= (req,res,next) => {
    adminId=req.params.adminId
    External.findById(adminId)
    .select('role')
    .exec()
    .then(doc => {
        if(doc) {
            if(doc.role=='Admin') { 
                console.log('Auth passed: User is admin')
                return next();
            }
        }
            return res.status(401).json({
                message: 'Auth failed not ADMIN'
            })
    })
}
 
exports.get_externals=(req,res,next) => {
    External.find()
    .exec()
    .then(docs => { 
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

exports.get_external_byId= (req,res,next) => {
    External.findById({_id:req.params.userId})
    .exec()
    .then(docs => { 
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

exports.delete_external = (req, res, next) => {
    External.findByIdAndDelete({ _id: req.params.userId })
    .exec()
    .then(result => {
        if(result) {
            res.status(200).json({
            message: "External deleted"
            })
        }
        else { res.status(200).json({
            message:"No external found"
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

 
exports.get_users=(req,res,next) => {
    User.find()
    .exec()
    .then(docs => { 
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

 
exports.get_user_byId= (req,res,next) => {
    User.findById({_id:req.params.userId})
    .exec()
    .then(docs => { 
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
    
exports.delete_user = (req, res, next) => {
    User.findByIdAndDelete({ _id: req.params.userId })
    .exec()
    .then(result => {
        if(result) {
            res.status(200).json({
            message: "User deleted"
            })
        }
        else { res.status(200).json({
            message:"No user found"
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

