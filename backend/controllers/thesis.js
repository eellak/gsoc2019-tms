const mongoose = require("mongoose");
const Thesis= require('../models/thesis');

exports.thesis_get_all= (req,res,next) => {
    Thesis.find({pending:false})
      //.select("name price _id productImage")
      .exec()
      .then(docs => {
        console.log(docs)
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


