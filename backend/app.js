const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors=require("./cors");
const external_login=require("./routes/external_login");
const SSOlogin=require("./routes/SSO_login");
var SamlStrategy = require('passport-saml').Strategy;
const passport =require('passport');
const dotenv = require('dotenv');
const auth = require('./ssoauth');
const jwt = require('jsonwebtoken');

dotenv.config();

// connect with database
mongoose.connect('mongodb+srv://new_mike_first:'+process.env.MONGO_PASSWORD+'@cluster0-wyycr.mongodb.net/test?retryWrites=true'
, {useNewUrlParser: true}).catch(err => {
  console.log(err);
})


app.use(morgan("dev"));
//app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);


// Routes which should handle requests
app.use('/external',external_login);
app.use('/SSO',SSOlogin);

 

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
