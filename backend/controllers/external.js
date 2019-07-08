const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Thesis=require("../models/thesis");
const External = require("../models/external");
const Pending= require("../models/pending")

exports.user_signup = (req, res, next) => {
  External.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new External({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              lastname: req.body.lastname
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "External User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {   
  External.find({ email: req.body.email })
    .exec()
    .then(user => { 
      if (user.length < 1) {console.log("not user")
        return res.status(401).json({
          message: "Auth failed, Wrong email or password"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => { console.log(result)
        if (err) {
          return res.status(401).json({
            message: "Auth failed, Wrong email or password"
          });
        }
        if (result) { 
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              role: user[0].role
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed3"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.get_pending= (req,res,next) => {
    Thesis.find({creator_external: req.userData.userId})
    .exec()
    .then(docs=> { 
      if(docs) {
        res.status(200).json(docs)
      }
      else {
        res.status(404).json({
          message: 'Not found'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error:err
      })
    })
  };

  
exports.get_pending_byId= (req,res,next) => {
      Thesis.find({creator_external: req.userData.userId , _id:req.params.pendingId})
      .exec()
      .then(docs=> {
        if(docs) {
          res.status(200).json(docs)
        }
        else {
          res.status(404).json({
            message: 'Not found'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          error:err
        })
      })
};

exports.create_pending= (req,res,next) => {
  const thesis = new Thesis({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    prerequisites: req.body.prerequisites,
    tags: req.body.tags,
    created_time: req.body.created_time,
    completed: false,
    pending: true,
    university: req.body.university,       // external should add university 
    creator_external: req.userData.userId
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

exports.get_accepted =(req,res,next) => {
  Pending.find({creator: req.userData.userId})
  .populate('thesis')
  .populate({path: 'professor' , select:'name lastname'  })
  .exec()
  .then(docs=> { 
    if(docs) {
      res.status(200).json(docs)
    }
    else {
      res.status(404).json({
        message: 'Not found'
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      error:err
    })
  })
};


exports.get_accepted_byId =(req,res,next) => {
  Pending.find({creator: req.userData.userId , _id:req.params.pendingId})
  .populate('thesis')
  .populate({path: 'professor' , select:'name lastname'  })
  .exec()
  .then(docs=> { 
    if(docs) {
      res.status(200).json(docs)
    }
    else {
      res.status(404).json({
        message: 'Not found'
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      error:err
    })
  })
};

exports.confirm_pending = (req,res,next) => { 
    Pending.find({_id:req.params.pendingId , creator:req.userData.userId})
    .exec()
    .then(doc => { console.log(doc)
      if(doc) { 
        Thesis.updateOne({ _id:doc[0].thesis },{professor:doc[0].professor , pending:false }, {new:true} )
        .exec()
        .then(result => {
          if(result) { 
            console.log('go to next middleware')
            res.locals.thesis=doc[0].thesis
            return next()
          }
          else {
            res.status(404).json({
              message: 'Not found'
            })
          }
        })
      }
      else {
        res.status(404).json({
          message: 'Not found'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err => {
        error:err
      })
    })

  }

exports.delete_all_pendings = (req,res,next) => { console.log('inside delete')
  Pending.deleteMany({thesis:res.locals.thesis , creator:req.userData.userId})
  .exec()
  .then(doc => { 
    if(doc.deletedCount>0) {
      var result= {
        doc: doc,
        thesis:res.locals.thesis
      }
      res.status(200).json(result)
    }
    else {
      res.status(404).json({
        message: 'Error in delete'
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      error:err
    });
  })

}