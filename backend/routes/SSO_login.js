const express = require("express");
const router = express.Router();
const passport= require("passport");
const app=express();
 const auth=require("../ssoauth");
const bodyParser=require("body-parser");
const jwt=require("jsonwebtoken");

//url : /SSO
app.use(passport.initialize());
app.use(passport.session());

router.get('/login',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

router.post("/login/callback",
    bodyParser.urlencoded({ extended: false }),
    (req, res, next) => {
      console.log(req.body);
       passport.authenticate("saml", { session: false }, (err, user) => {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user.id
          },
          process.env.JWT_KEY,
          { expiresIn: '72h' }
        );
        console.log("to token einai" + token)
         req.user = user;

        next();
      })(req, res, next);
    });

    router.get('/logout', (req, res) => {
        // res.clearCookie("cookie.sid");
         //HERE I SHOULD PUT LOGOUT LOGIC ON OUR APP : EXAMPLE DESTROY TOKEN. SAME AS SIMPLE LOGOUT
          res.redirect('https://dev-i5mfll-2.auth0.com/v2/logout?client_id=ISe3r0XrgUoKgchkvExvSPlqGecxhN67&returnTo=http://localhost:3000/SSO/logout/callback');

       });
       
    
 
module.exports = router;
