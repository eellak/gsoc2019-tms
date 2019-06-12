const mongoose = require("mongoose");
const Thesis= require('../models/thesis');
const External= require('../models/external');
const Request=require('../models/request');                       
const User=require('../models/user');
const Time_period=require("../models/time_period");
const University=require('../models/university');


exports.is_admin= (req,res,next) => {
    adminId=req.userData.userId
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
    var perPage = 5
    var page = req.query.page || 1  
    var count;
    External.countDocuments()
    .then( result => {
            count=result
        External.find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec()
        .then(docs => { 
            if(docs!=null){
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
    var perPage = 5
    var page = req.query.page || 1  
    var count;
    User.countDocuments()
    .then( result => {
        count=result
        User.find()
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



exports.application_period= (req,res,next) => {
    const update_object= {application_period_start: req.body.application_period_start,
                         application_period_end: req.body.application_period_end}

    Time_period.findOneAndUpdate({admin:req.userData.userId} , update_object, {new:true})
    .exec()
    .then(doc => {
        if(doc==null) {
            console.log("create new")
            var time_period= new Time_period({
                _id: new mongoose.Types.ObjectId(),
                admin: req.userData.userId,
                application_period_start: req.body.application_period_start,
                application_period_end: req.body.application_period_end
            })
            time_period
            .save()
            .then(result => {
                res.status(200).json(result)
            })
        }
        else {
                console.log("found")
                res.status(200).json(doc)
        }
    })
    .catch(err => {
        res.status(500).json({error :err})
    })

}
 


exports.create_university= (req,res,next) => {
    var university= new University({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    })
    university
    .save()
    .then(result => {
        if(result!=null) {
            console.log('university created')
            res.status(200).json(result)
        }
        else {
            res.status(500).json({message: 'Error in creation of university'})
        }

    })
    .catch(err => {
        res.status(500).json({error:err})
    })
}

 
