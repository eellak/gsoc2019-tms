const mongoose = require("mongoose");
const Thesis= require('../models/thesis');
const Student= require('../models/user');
const Request=require('../models/request');                   
const Assigned_Thesis=require('../models/assigned_thesis');    
const Pending= require("../models/pending")
const Draft= require("../models/draft");
const Time_period=require("../models/time_period");
const Notification=require("../models/notification");

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
                    return next();
                }
                else {
                    return res.status(401).json({
                        message: 'Auth failed not student or not same university'
                    })
                }
            })
            .catch(err => {
              res.status(500).json({error:err})
            })
        })
        .catch(err => {
          res.status(500).json({error:err})
        })
       };

exports.is_student= (req,res,next) => {
  if(req.userData.role!='Student') {
    console.log("You are not a student")
    res.status(400).json({message:'You are not a student'})
  }
  else 
    next();
}


exports.checkApplication_period= (req,res,next) => { 
  var currentDate=new Date()
  Time_period.find()
  .exec()
  .then(result => {  
    if(result[0].application_period_start<= currentDate && currentDate <= result[0].application_period_end)
        {
          console.log("We are currently in application period ")
          return next()
        }
      else {
        console.log("Currently not in application period")
        res.status(400).json({message: 'Currently not in application period'})
      }
  })
  .catch(err => {
    res.status(500).json({error:err})
  })
}









exports.checkRequest= (req,res,next) => {
    // check if student has already applied for the thesis
    Request.find({student : req.userData.userId, thesis: req.params.thesisId })
    .exec()
    .then(doc => {
        if(doc.length>0) {
            return res.status(200).json({
                message: 'You have already applied for this thesis'
            })
        }
        else {
          res.status(200).json({
            message:"Success"
          })
        }
  })
  .catch(err=> {
    res.status(500).json({
      error: err
    });
  });

}

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
        else {
        var thesisId=req.params.thesisId;
         const request = new Request({
            _id: new mongoose.Types.ObjectId(),
            student: req.userData.userId,
            professor: res.locals.professorId,
            thesis: req.params.thesisId,
            accepted_fromStudent: false,
            accepted_fromProfessor: false,
            text:req.body.text,
            created_time: new Date()
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
      }
    })
    };
 
    
    exports.get_request= (req,res,next) => {
        var perPage = 6
        var page = req.query.page || 1
        var count;
        var query= {student:req.userData.userId}
        Request.countDocuments(query)
        .then(result => {
          count=result
          Request.find(query)
          .populate('thesis')
          .populate({path:'professor' , select:'name lastname email'})
          .skip((perPage * page) - perPage)
          .limit(perPage)
          .exec()
          .then(docs => { console.log(req.userData.userId)
                if(docs!=null) {
                  var response= {
                    count: count,
                    pages: Math.ceil(count / perPage),
                    docs:docs 
                  }
                  res.status(200).json(response);
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

        })
      
        };
    
     
exports.delete_all_requests= (req,res,next) => {
    // check if he owns the request
    Request.deleteMany({student:req.userData.userId})
    .exec()
    .then(result => {
        if(result.deletedCount>0) { 
            res.status(200).json({
            doc: res.locals.doc,
            message: "Requests deleted"
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

exports.delete_request= (req,res,next) => {
    // check if he owns the request
    Request.deleteOne({student:req.userData.userId, _id:req.params.requestId})
    .exec()
    .then(result => {
        if(result.deletedCount>0) { 
            res.status(200).json({
            doc: res.locals.doc,
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

exports.post_accepted_request=(req,res,next) => { //student confirms his requests. All other requests of the student are deleted
    var updateObj={accepted_fromStudent:true}; console.log("inside post")
    Request.findOneAndUpdate({_id:req.params.requestId , accepted_fromProfessor:true},updateObj, {new:true} )
        .exec()
        .then(docs => {
            if(docs!=null) {
                const assigned_thesis = new Assigned_Thesis({
                    _id: new mongoose.Types.ObjectId(),
                    student:docs.student,
                    professor:docs.professor,
                    university:req.userData.university,
                    thesis:docs.thesis,
                    created_time: new Date(),
                    completed: false,
                });
                assigned_thesis
                .save()
                .then( doc=>{
                    update(docs.thesis)
                    res.locals.doc=doc;
                    next();
                })
                .catch(err => {
                    res.status(500).json({
                        error:err
                    })
                })
            }
            else {
                res.status(404).json({
                    message: 'Not found'
                })
            }
        })
    }
                

function update(thesis) { console.log('somethinaaa')
    Thesis.findOneAndUpdate({_id:thesis},{assigned:true},{new:true})    
                    .exec()
                    .then(doc=> {
                        if(doc!=null)
                            return ;
                        else 
                            return
                    })
            .catch(err => {
              console.log(err+"wjat");
              res.status(500).json({
                error: err
              });
            })
};

 exports.get_thesis=(req,res,next) => {
     Assigned_Thesis.find({student:req.userData.userId})
     .populate('thesis')
     .exec()
     .then( doc=> {
         if(doc) {
            res.status(200).json(doc)
         }
         else {
            res.status(404).json({
                message: 'No assigned thesis'
            })
         }
     })
     .catch(err => {
         res.status(500).json({
             error:err
         });
     })
}

exports.get_accepted_request_byId= (req,res,next) => {
    Request.find({student:req.userData.userId , accepted_fromProfessor:true , _id:req.params.requestId})
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


    exports.get_pending= (req,res,next) => {
        Thesis.find({creator_student: req.userData.userId})
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
        Thesis.find({creator_student: req.userData.userId , _id:req.params.pendingId})
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
      university: req.body.university,       // student should add university 
      creator_student: req.userData.userId
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


  
exports.get_accepted_pending =(req,res,next) => {
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
  
  
exports.get_accepted_pending_byId =(req,res,next) => {
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
    .then(doc => {  
      if(doc.length>0) { console.log(doc)
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


exports.check_thesis=(req,res,next) => {   //check if thesis id belongs to student
  Assigned_Thesis.find({_id:req.params.assigned_thesisId , student:req.userData.userId})
  .exec()
  .then(result => {
    if(result!=null) {
        return next();
    }
    else {
      return res.status(401).json({
        message: 'Auth failed: thesis doesnt belong to user'
    })
    }
  })
  .catch(err => {
    res.status(500).json({error:err})
  })
}


exports.get_drafts=(req,res,next) => {
    Draft.find({assigned_thesis:req.params.assigned_thesisId})
    .exec()
    .then(result => {
      if(result!=null ) {
        res.status(200).json(result)
      }
      else {
        res.status(404).json({
          message: 'Not found drafts'
        })
      }
    })
    .catch(err => {
      res.status(500).json({error:err})
    })
}

exports.get_draft_byId=(req,res,next) => {
  Draft.find({assigned_thesis:req.params.assigned_thesisId , _id:req.params.draftId})
  .exec()
  .then(result => {
    if(result!=null ) {
      res.status(200).json(result)
    }
    else {
      res.status(404).json({
        message: 'Not found drafts'
      })
    }
  })
  .catch(err => {
    res.status(500).json({error:err})
  })
}

exports.post_draft=(req,res,next) => {
  
  const draft = new Draft({
    _id: new mongoose.Types.ObjectId(),
    url: req.body.url,
    created_time : new Date(),
    assigned_thesis : req.params.assigned_thesisId
  })
  draft
  .save()
  .then(result => {
    if(result!=null ) {
      console.log('Draft created successfully')
      res.status(200).json(result)
    }
    else {
      res.status(404).json({
        message: 'Error in creation of draft'
      })
    }
  })
  .catch(err => {
    res.status(500).json({error:err})
  })
}


exports.get_notifications=(req,res,next) => {
  var perPage = 6
  var page = req.query.page || 1
  var count;
  Notification.countDocuments({receiver_user:req.userData.userId})
  .then(result=> { 
    count=result
    Notification.find({receiver_user:req.userData.userId})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec()
      .then(docs => {
        const response = {
            docs:docs,
            count:count,
            pages: Math.ceil(count / perPage),
        }
        res.status(200).json(response);
    })
  })
      .catch(err => {
        console.log(err+"wjat");
        res.status(500).json({
          error: err
        });
      })
}