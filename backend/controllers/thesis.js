const mongoose = require("mongoose");
const Thesis = require('../models/thesis');
const FileThesis = require('../models/file_thesis');
const AssignedThesis = require('../models/assigned_thesis');
const CompletedThesis= require("../models/completed_thesis");


exports.thesis_get_all = (req, res, next) => {
  var perPage = 5
  var page = req.query.page || 1
  var query = { pending: false }
  if (req.query.university != null)
    query['university'] = req.query.university
  if (req.query.professor != null) {
    query['professor'] = req.query.professor
    console.log(req.query.professor)
  }
  var count;
  console.log(query)
  Thesis.countDocuments(query)
    .then(result => {
      count = result
      Thesis.find(query)
        .populate('professor')
        .populate('university')
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec()
        .then(docs => {
          const response = {
            docs: docs,
            count: count,
            pages: Math.ceil(count / perPage),
          }
          res.status(200).json(response);
        })
    })
    .catch(err => {
      console.log(err + "wjat");
      res.status(500).json({
        error: err
      });
    })
}



exports.get_byId = (req, res, next) => {
  Thesis.findById({ _id: req.params.thesisId })
    .populate('professor')
    .populate('university')
    .populate({ path: 'creator_student', select: 'name lastname email' })
    .populate({ path: 'creator_external', select: 'name lastname email' })
    .exec()
    .then(doc => {
      if (doc != null)
        res.status(200).json(doc);
      else
        res.status(404).json({ message: 'Thesis not found' })
    })
    .catch(err => {
      console.log(err + "wjat");
      res.status(500).json({
        error: err
      });
    })
}

exports.get_files = (req, res, next) => {
  FileThesis.find({ thesis: req.params.thesisId })
    .exec()
    .then(result => {
      if (result != null) {
        console.log(result)
        res.status(200).json(result)
      }
      else {
        res.status(200).json({
          message: "Not found"
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.get_file_byId = (req, res, next) => {
  FileThesis.findById({ _id: req.params.fileId })
    .exec()
    .then(result => {
      if (result != null) {
        console.log(result)
        res.status(200).json(result)
      }
      else {
        res.status(200).json({
          message: "Not found"
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}



exports.thesis_completed_get_all = (req, res, next) => {
  var perPage = 5
  var page = req.query.page || 1
  var count;
  var query = { completed: true }
   AssignedThesis.countDocuments(query)
    .then(result => {
      count = result
      AssignedThesis.find(query)
        .populate('thesis')
        .populate({path: 'professor' , select: 'name lastname email '})
        .populate({path: 'student' , select: 'name lastname email '})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec()
        .then(docs => {
          const response = {
            docs: docs,
            count: count,
            pages: Math.ceil(count / perPage),
          }
          res.status(200).json(response);
        })
        .catch(err => {
          console.log(err + "wjat");
          res.status(500).json({
            error: err
          });
        });
    })
    .catch(err => {
      console.log(err + "wjat");
      res.status(500).json({
        error: err
      });

    })
}



exports.thesis_completed_file=(req,res,next) => {
    CompletedThesis.find({thesis:req.params.assigned_thesisId})
   .select('_id file_name created_time thesis')
  .exec()
  .then( result => {
    if(result.length>0) {
      res.status(200).json(result)
    }
    else {
       res.status(404).json({
        message: "Not found"
      })
    }
  })
  .catch(err => {
    res.status(500).json({error:err})
  })
}

exports.thesis_completed_data_file=(req,res,next) => {
  CompletedThesis.find({_id:req.params.fileId})
  .select('_id file_data')
 .exec()
 .then( result => {
   if(result.length>0) {
     res.status(200).json(result)
   }
   else {
      res.status(404).json({
       message: "Not found"
     })
   }
 })
 .catch(err => {
   res.status(500).json({error:err})
 })
}