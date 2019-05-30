const mongoose = require("mongoose");
const Thesis= require('../models/thesis');

exports.thesis_get_all= (req,res,next) => {
    Thesis.find()
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
              id_university: doc.id_university,
              id_owner: doc.id_owner,
              id_creator_student: doc.id_creator_student,
              id_creator_external: doc.id_creator_external,
              request: {
                type: "GET",
                url: "http://localhost:3000/thesis/" + doc._id
              }
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
              id_student: doc.id_student,
              id_university: doc.id_university,
              id_owner: doc.id_owner,
              id_creator_student: doc.id_creator_student,
              id_creator_external: doc.id_creator_external,
              request: {
                type: "GET",
                url: "http://localhost:3000/thesis/" + doc._id
              }
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


