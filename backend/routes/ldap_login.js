const express = require("express");
const router = express.Router();
const passport= require("passport");
const mongoose = require("mongoose");
const app=express();
const auth=require("../controllers/ldapauth");
const bodyParser=require("body-parser");
const jwt=require("jsonwebtoken");

//url : /ldap
app.use(passport.initialize());
app.use(passport.session()); 

router.get('/login', auth.setUniversity,
  passport.authenticate('ldapauth', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
     res.redirect('/');
  }
);

router.post("/login",
    bodyParser.urlencoded({ extended: false }),
    (req, res, next) => {
      passport.authenticate("ldapauth", { session: false ,  passReqToCallback: true }, (err, user) => {
        if(err)  {
          console.log("Error"+err)
        }
        console.log('User to give sign in token is: ' + user)
        if(user){
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
              role: user.role,
              university: user.university,
              name: user.name,
              lastname: user.lastname
            },
            process.env.JWT_KEY,
            { expiresIn: '5h' }
          );
          req.user = user;
          req.token=token;
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            role: user.role,
            university: user.university
          });
        }
        next();
      })(req, res, next);
});

module.exports = router;