const express = require("express");
const router = express.Router();
const passport= require("passport");
const app=express();
 const auth=require("../ssoauth");
const bodyParser=require("body-parser");
const jwt=require("jsonwebtoken");
const professor =require("../controllers/professor")


//url : /SSO
app.use(passport.initialize());
app.use(passport.session());

router.get('/login', auth.setUniversity,
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
     res.redirect('/');
  }
);

router.post("/login/callback",
    bodyParser.urlencoded({ extended: false }),
    (req, res, next) => {
        passport.authenticate("saml", { session: false ,  passReqToCallback: true }, (err, user) => {
          if(err)  {
            console.log("Error"+err)
          }
         console.log(user)
        const token = jwt.sign(
          {
            email: user.email,
            userId: user.id,
            role: user.role,
            university: user.university,
            name: user.name,
            lastname: user.lastname
          },
          process.env.JWT_KEY,
          { expiresIn: '5h' }
        );
        console.log("token:" + token)
         req.user = user;
         req.token=token;
        next();
      })(req, res, next);
    });

    router.post("/login/callback",
    bodyParser.urlencoded({ extended: false }),
    (req, res, next) => { 
        res.redirect(process.env.SERVER_IP+":4200/?access_token="+req.token+"&role="+req.user.role+"&university="+req.user.university);
    });
      

    router.get('/logout', (req, res) => {
           res.redirect('https://dev-i5mfll-2.auth0.com/v2/logout?client_id=nN6sDa8ZyhOlc4jC67Xu1x76zgZ7Kl6X&returnTo='+process.env.SERVER_IP+':3000/SSO/logout/callback');

       });
       
    
 
module.exports = router;
