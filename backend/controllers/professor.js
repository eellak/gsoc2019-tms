const mongoose = require("mongoose");
const Thesis= require('../models/thesis');
const Professor= require('../models/user');
const Request=require('../models/request');    
const Assigned_Thesis=require('../models/assigned_thesis');
const Pending=require('../models/pending');
const University= require('../models/university');
const Supervision_Request= require('../models/supervision_requests');

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

exports.get_request_byId= (req,res,next) => {
      Request.find({professor:req.userData.userId , _id:req.params.requestId})
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


exports.accept_request= (req,res,next) => {      //sent notification to student: not implemented yet
  var updateObj={accepted_fromProfessor:true};
  Request.findOneAndUpdate({_id:req.params.requestId , professor:req.userData.userId}, updateObj ,{new:true})
  .exec()
  .then(docs => { console.log(docs)
        if(docs!=null) {
          res.status(200).json(docs);
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


exports.get_thesis= (req,res,next) => {
    var perPage = 5
    var page = req.query.page || 1
    var count;
    var query={professor:req.userData.userId,pending:false}
    Thesis.countDocuments(query)
    .then(result=> { 
      count=result
      Thesis.find(query)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .populate({ path: 'professor', select:'name lastname email'})
      .exec()
        .then(docs => {
          const response = {
            count: count,
            pages: Math.ceil(count / perPage),
            theses: docs.map(doc => {
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
                assigned: doc.assigned,
                creator_student: doc.creator_student,
                creator_external: doc.creator_external
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
    })
}


exports.get_thesis_byId= (req,res,next) => {
    Thesis.findOne({_id:req.params.thesisId, professor:req.userData.userId})
    .populate({ path: 'university', select:'name'})
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
     Thesis.deleteOne({professor:req.userData.userId, _id:req.params.thesisId , assigned:false})
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
        title: req.body.thesis.title,
        description: req.body.thesis.description,
        prerequisites: req.body.thesis.prerequisites,
        tags: req.body.thesis.tags,
        created_time: req.body.thesis.created_time,
        completed: false,
        pending: false,
        university: req.userData.university
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
  Thesis.findOneAndUpdate({_id:req.params.thesisId,professor:req.userData.userId},updateObj,{new:true})
  .exec()
  .then(result => {
    if(result!=null) {
      res.status(200).json(result)
    }
    else 
      res.status(404).json({message : 'Not found'})
  })
  .catch(err => {
    res.status(500).json({error:err})
  })
}
 

exports.isProfessor=(req,res,next) => {
  if(req.userData.role!='Professor') {
    console.log("You are not a professor")
    res.status(400).json({message:'You are not a student'})
  }
  else 
    next();
}

exports.get_assigned=(req,res,next) => {
    var perPage = 5
    var page = req.query.page || 1
    var count;
    query={professor:req.userData.userId}
    Assigned_Thesis.countDocuments(query)
    .then(result=> { 
      count=result
      Assigned_Thesis.find(query)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .populate('thesis')
      .populate('professor')
      .populate('student')
      .exec()
      .then(docs => {
        var response= {
          count: count,
          pages: Math.ceil(count / perPage),
          docs:docs 
        }
        if(docs) {
          res.status(200).json(response);
        }
        else 
          res.status(404).json({
            message: 'No assigned thesis found'
        })
    })
    })
    .catch(err => {
      console.log(err+"wjat");
      res.status(500).json({
      error: err
      });
    });
  }

exports.get_assigned_byId= (req,res,next) => { 
  Assigned_Thesis.find({ _id:req.params.assigned_thesisId, professor:req.userData.userId})
    .populate('thesis')
    .exec()
    .then(docs => {
      if(docs) {
        res.status(200).json(docs);
      }
      else 
        res.status(404).json({
          message: 'No assigned thesis found'
      })
  })
    .catch(err => {
      console.log(err+"wjat");
      res.status(500).json({
      error: err
      });
    });
  }


exports.get_pending= (req,res,next) => {
  Thesis.find({pending:true , university:req.userData.university})
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

exports.get_pending_byId= (req,res,next) => {
      Thesis.find({pending:true, _id:req.params.pendingId})
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
  
exports.check_pending = (req,res,next) => {
  Pending.find({professor:req.userData.userId , thesis:req.params.pendingId})
  .exec()
  .then(docs=>{
    if(docs.length>0) {
      res.status(404).json({
        message:'You have already applied for this pending thesis'
      })
    }
    else {
      next();
    } 
  })
    .catch(err=> {
      res.status(500).json({
        error: err
      });
    })
};


exports.accept_pending= (req,res,next) => {
  Thesis.findOne({_id:req.params.pendingId , pending:true})
  .exec()
  .then(docs => { 
        if(docs!=null) {
          var creator;
          console.log(docs.creator_external)
          if(docs.creator_external!=null)
              creator=docs.creator_external
          else 
              creator=docs.creator_student
          const pending_thesis= new Pending({
            _id: new mongoose.Types.ObjectId(),
            creator:creator,
            professor:req.userData.userId,
            thesis:docs.id,
          });
          pending_thesis
          .save()
          .then(docs => {
            res.status(200).json(docs)
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


exports.get_professors= (req,res,next) => {
  Professor.find({_id:req.userData.userId})
  .exec()
  .then( user => { 
    if(user.length>0) {
        Professor.find({university:user[0].university , role:'Professor'})
        .exec()
        .then( results=> {
          if(results.length>0) {
            res.status(200).json(results)
          }
          else res.status(404).json({Message: 'No professors found'})
        })
      }
    else res.status(404).json({Message: 'No user found'})
    })
    .catch(err => {
      console.log(err+"wjat");
      res.status(500).json({
          error: err 
        })
    })
  }



exports.get_supervise = (req,res,next) => {



}

exports.post_supervise = (req,res,next) => {



}

exports.propose_supervisor =(req,res,next) => {
   Professor.findById({_id:req.params.supervisorId})
   .exec()
   .then(doc => { 
     if(doc!=null) {
          Thesis.findById({_id:req.params.thesisId , professor:req.userData.userId})
          .exec()
          .then(thesis => {
                if(thesis!=null) {
                  var supervision_request = new Supervision_Request({
                      _id: new mongoose.Types.ObjectId(),
                      student: thesis.student,
                      professor: thesis.professor,
                      dst_professor : req.params.supervisorId,
                      thesis: thesis._id,
                      text : req.body.text,
                      created_time : new Date(),
                      accepted_fromProfessor: false
                  })
                  supervision_request
                  .save()
                  .then(result => {
                    res.status(200).json(result);
                  })
                }
                else {
                  res.status(404).json({
                    message: 'Thesis not found'
                  });
                }
            })
      }
      else {
          res.status(404).json({
            message: 'Professor not found'
          });
      }
    })
    .catch(err => {
      res.status(500).json({error:err})
    })
    };



exports.accept_supervisor= (req,res,next) => { // confirm supervisor
  Supervision_Request.find({_id:req.params.supervise_requestId, professor:req.userData.userId})
  .exec()
  .then(doc => {
    if(doc.length>0) { console.log(doc)
        Thesis.findOneAndUpdate({_id:doc[0].thesis},{$push: {supervisor:doc[0].dst_professor} },{new:true})
        .exec()
        .then( result => {
          if(result)
              return next()
          else 
            res.status(404).json({message:'Not found'})
        })
    } 
    else {
      res.status(404).json({message:'Not found'})
    }
  })
    .catch(err => {
      res.status(500).json({error:err})
    });
  }

exports.delete_supervisor_request= (req,res,next) => {
  Supervision_Request.deleteOne({_id:req.params.supervise_requestId})
  .exec()
  .then(result =>{
    if(result)
      res.status(200).json(result)
    else {
      res.status(404).json({message: 'Error on delete supervisor request'});
    }

  })
  .catch(err => {
    res.status(500).json({error:err});
  })

}

exports.get_accepted_supervisor_requests=(req,res,next) => { 
    Supervision_Request.find({professor:req.userData.userId, accepted_fromProfessor:true})
    .exec()
    .then(result => { 
      if(result.length>0) {
        res.status(200).json(result)
      }
      else { 
        res.status(404).json({message: 'No supervisor requests'})
      }
    })

}

exports.get_accepted_supervisor_request_byId=(req,res,next) => { 
  Supervision_Request.find({professor:req.userData.userId, accepted_fromProfessor:true, _id:req.params.supervise_requestId})
  .exec()
  .then(result => {  
    if(result.length>0) {
      res.status(200).json(result)
    }
    else { 
      res.status(404).json({message: 'No supervisor requests'})
    }
  })

}



exports.get_supervise_pending= (req,res,next) => {
  Supervision_Request.find({dst_professor:req.userData.userId})
  .exec()
  .then(results => {
    if(results!=null) {
      res.status(200).json(results)
    }
    else {
      res.status(404).json({message:'Not found'})
    }
  })
  .catch(err=> {
    res.status(500).json({error:err})
  })

}


exports.get_supervise_pending_byId= (req,res,next) => {
  Supervision_Request.find({dst_professor:req.userData.userId , _id:req.params.supervise_requestId})
  .exec()
  .then(results => {
    if(results!=null) {
      res.status(200).json(results)
    }
    else {
      res.status(404).json({message:'Not found'})
    }
  })
  .catch(err=> {
    res.status(500).json({error:err})
  })

}


exports.post_supervise_pending= (req,res,next) => {
  Supervision_Request.findOneAndUpdate({dst_professor:req.userData.userId , _id:req.params.supervise_requestId}
                                        ,{ accepted_fromProfessor:true} , {new:true} )
      .exec()
      .then(result => {
        if(result!=null) {
          res.status(200).json(result)
        }
        else {
          res.status(404).json({message: 'Not found'})
        }
      })
      .catch(err=> {
        res.status(500).json({error:err})
      })
}

exports.check_supervisor_request = (req,res,next) => { 
  Supervision_Request.find({professor:req.userData.userId , dst_professor:req.params.supervisorId})
  .exec()
  .then(docs=>{ console.log(docs)
    if(docs.length>0) {
      res.status(404).json({
        message:'You have already applied for this pending thesis'
      })
    }
    else {
      next();
    } 
  })
    .catch(err=> {
      res.status(500).json({
        error: err
      });
    })
};
