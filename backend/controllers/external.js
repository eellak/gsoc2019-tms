const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Thesis=require("../models/thesis");
const External = require("../models/external");
const Pending= require("../models/pending");
const FileThesis = require("../models/file_thesis");



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
              lastname: req.body.lastname,
              active : false
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
      if(!user[0].active) {
        return res.status(401).json({
          message: "Your account must be activated from admin"
        }) 
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
              role: user[0].role,
              name: user[0].name,
              lastname: user[0].lastname
            },
            process.env.JWT_KEY,
            {
              expiresIn: "5h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            role: user[0].role
          });
        }
        res.status(401).json({
          message: "Auth failed"
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
    var perPage = 5
    var page = req.query.page || 1
    var count;
    var query={creator_external: req.userData.userId}
    Thesis.countDocuments(query)
    .then(result => {
      count=result
      Thesis.find(query)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .populate('university')
      .exec()
      .then(docs=> { 
          if(docs!=null) {
            var response= {
              count: count,
              pages: Math.ceil(count / perPage),
              docs:docs 
            }
            res.status(200).json(response)
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
    })
    .catch(err => {
      res.status(500).json({
        error:err
      })
    })
  };

  
exports.get_pending_byId= (req,res,next) => {
      Thesis.find({creator_external: req.userData.userId , _id:req.params.pendingId})
      .populate('university')
      .exec()
      .then(docs=> {
        if(docs) {
          console.log(docs)
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
    title: req.body.thesis.title,
    description: req.body.thesis.description,
    prerequisites: req.body.thesis.prerequisites,
    tags: req.body.thesis.tags,
    created_time: req.body.thesis.created_time,
    completed: false,
    pending: true,
    assigned: false,
    university: req.body.thesis.university,       // external should add university 
    creator_external: req.userData.userId
  });
  thesis
    .save() 
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created thesis successfully",
        thesis:result
      })
      })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.post_pdf=(req,res,next) => {
  const file_thesis = new FileThesis ({
      _id: new mongoose.Types.ObjectId(),
      file_name: req.files.pdf.name,
      file_data: req.files.pdf.data,
      thesis: req.params.thesisId
  });
  file_thesis
  .save()
  .then(result => {
    console.log(result)
    Thesis.findById(req.params.thesisId)
    .updateOne({file:result._id})
    .exec()
    .then( result => {
      if(result!=null)
        res.status(200).json(result)
      else {
        res.status(404).json({
          message:"Error in post_pdf"
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
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


exports.get_accepted =(req,res,next) => {
  Pending.find({creator: req.userData.userId})
  .populate('thesis')
  .populate({path: 'professor' , select:'name lastname'  })
  .populate('university')
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

exports.update_thesis=(req,res,next) => {
  updateObj={};
  if(req.body.thesis.title!=null)
      updateObj['title']=req.body.thesis.title
  if(req.body.thesis.description!=null)
      updateObj['description']=req.body.thesis.description
  if(req.body.thesis.prerequisites!=null)
      updateObj['prerequisites']=req.body.thesis.prerequisites
  if(req.body.thesis.tags!=null)
      updateObj['tags']=req.body.thesis.tags
  Thesis.findOneAndUpdate({_id:req.params.thesisId,creator_external:req.userData.userId},updateObj,{new:true})
  .exec()
  .then(result => {
    if(result!=null) {
      res.status(200).json(result)
    }
    else 
      res.status(404).json({message : 'Not found'})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error:err})
  })
}

exports.delete_file= (req,res,next) => {
  Thesis.find({_id:req.params.thesisId, creator_external:req.userData.userId })
  .exec()
  .then(result => {
    console.log("inside")
    console.log(result)
    if(result.length>0) {
          FileThesis.deleteOne({_id:req.params.fileId ,thesis:result[0]._id,})
          .exec()
          .then(doc => {
            if(doc.deletedCount>0) {
              res.status(200).json(doc)
          }
          else {
            res.status(404).json({
              message: 'Error in delete'
            })
          }
           })
        }
  })
}