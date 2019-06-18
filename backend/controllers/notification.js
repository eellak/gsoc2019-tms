const mongoose = require("mongoose");
const Thesis= require('../models/thesis');
const Notification=require('../models/notification');



exports.get_all= (req,res,next) => {
  var perPage = 2
  var page = req.query.page || 1
  var count;
  console.log(query)
  Notification.countDocuments({_})
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