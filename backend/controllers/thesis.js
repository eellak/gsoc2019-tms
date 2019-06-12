const mongoose = require("mongoose");
const Thesis= require('../models/thesis');



exports.thesis_get_all= (req,res,next) => {
  var perPage = 2
  var page = req.query.page || 1
  var query= {pending:false}
  if(req.query.university!=null)
     query['university']=req.query.university
  var count;
  console.log(query)
  Thesis.countDocuments(query)
  .then(result=> { 
    count=result
    Thesis.find(query)
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



exports.get_byId= (req,res,next) => {
    Thesis.findById({_id:req.params.thesisId})
      .exec()
      .then(doc => {
        if(doc!=null)
          res.status(200).json(doc);
        else 
          res.status(404).json({message : 'Thesis not found'})
      })
      .catch(err => {
        console.log(err+"wjat");
        res.status(500).json({
          error: err
        });
      })
}




exports.thesis_completed_get_all= (req,res,next) => {
    Thesis.find({completed:true})
      //.select("name price _id productImage")
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


