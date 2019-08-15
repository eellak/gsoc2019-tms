const mongoose = require("mongoose");
const University= require('../models/university');


exports.get_all=(req,res,next) => {
    var perPage = 6
    var page = req.query.page || 1
    var query= {pending:false}
    if(req.query.university!=null)
       query['university']=req.query.university
    var count;
    console.log(query)
    query={}
    University.countDocuments(query)
    .then(result=> { 
      count=result
      University.find(query)
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

  exports.get_all_noPages=(req,res,next) => {
      University.find()
        .exec()
        .then(docs => {
          res.status(200).json(docs);
      })
        .catch(err => {
          console.log(err+"wjat");
          res.status(500).json({
            error: err
          });
        })
  }

  exports.get_byId= (req,res,next) => {
    University.findById({_id:req.params.universityId})
      .exec()
      .then(doc => {
        if(doc!=null)
          res.status(200).json(doc);
        else 
          res.status(404).json({message : 'University not found'})
      })
      .catch(err => {
        console.log(err+"wjat");
        res.status(500).json({
          error: err
        });
      })
}
