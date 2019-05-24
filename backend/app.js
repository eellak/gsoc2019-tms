const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//const productRoutes = require("./api/routes/products");
//const orderRoutes = require("./api/routes/orders");
//const userRoutes = require('./api/routes/user');


mongoose.connect('mongodb+srv://new_mike_first:W2ge1cXlGCm9TpDI@cluster0-wyycr.mongodb.net/test?retryWrites=true'
, {useNewUrlParser: true}).catch(err => {
  console.log(err);
})

app.use(morgan("dev"));
//app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests



// Error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
