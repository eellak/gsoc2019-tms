const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors=require("./cors");
const bcrypt = require("bcrypt");
const External = require("./models/external");
const University = require('./models/university');
const sendAuth=require("./middleware/send-auth");
var SamlStrategy = require('passport-saml').Strategy;
const passport =require('passport');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const rateLimit = require("express-rate-limit");
const fileUpload = require('express-fileupload');
const external_loginRoutes=require("./routes/external");
const ldapLoginRoutes=require('./routes/ldap_login');
const thesisRoutes=require('./routes/thesis');
const studentRoutes=require('./routes/student');
const adminRoutes=require('./routes/admin');
const professorRoutes=require('./routes/professor');
const universityRoutes=require('./routes/university');
const secretariatRoutes=require('./routes/secretariat');

dotenv.config();
// connect with database
mongoose.connect('mongodb://mongo:27017/test1?retryWrites=true'
, {useNewUrlParser: true ,   useCreateIndex: true,
})
  .catch(err => {
    console.log('error in database:'+err);
  
})

var db = mongoose.connection;

db.once('open', function() {
  console.log("Connection Successful!!");

  let myPlaintextPassword = process.env.ADM_PWD;
  let saltRounds = 10;
  bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    if (err) {
      console.log('Error in creating Admin');
    } else {
      const initial = new External({
        _id: new mongoose.Types.ObjectId(),
        email: process.env.ADM_EMAIL,
        password: hash,
        name: "initial",
        lastname: "initial",
        role: "Admin",
        active: true
      })
    
      initial
        .save()
        .then(result => {
          console.log('Admin is ' + result.email);         
        })
        .catch( err => {
            console.log(err);
        })
    }
  });

  const hua = new University({
    _id: new mongoose.Types.ObjectId('000000000001'),
    name: 'Χαροκόπειο Πανεπιστήμιο'
  });

  hua.save()
  .then(result => {
    console.log('University is ' + result.name + ' ID: ' + result._id);         
  })
  .catch( err => {
      console.log(err);
  })

})

// limit request from ip
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 500 // limit each IP to 200 requests per windowMs
});

app.use(morgan("dev"));
//app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);
app.use(limiter);
app.use(fileUpload());

// Routes which should handle requests
app.use('/external',external_loginRoutes);
app.use('/ldap', ldapLoginRoutes);
app.use('/thesis',thesisRoutes);
app.use('/student',studentRoutes);
app.use('/admin',adminRoutes);
app.use('/professor',professorRoutes);
app.use('/university',universityRoutes);
app.use('/secretariat',secretariatRoutes);
app.get('/user',sendAuth);


//// android studio 

const formidable = require('formidable')
var multer= require('multer');
var upload=multer({dest: 'uploads/'})
app.post("/android",(req,res,next)=>{
    console.log(req)
    const myfile=req.files.file;
    const age= req.headers.age;
    const education = req.headers.education;
    const gender = req.headers.gender;
    const diseases = req.headers.diseases;
    const fs = require('fs');
    var path = process.cwd();
    fs.writeFile(path+'/android', myfile, function(err) {
      if(err) {
          return console.log(err);
      }
      
      console.log("The file was saved!");
      res.status(200).json({message:"The file was saved"})
    }); 
  })

/////////



app.get("/",(req,res,next) => {
  res.render()
})

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
