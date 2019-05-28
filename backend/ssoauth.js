var passport = require('passport');
var SamlStrategy = require('passport-saml').Strategy;
const User = require("./models/user");
const mongoose = require("mongoose");

//users array to hold
passport.serializeUser(function (user, done) {
    console.log("inside serializeUser")
    done(null, user.email);
});

passport.deserializeUser(function(id, done) {
    findByEmail(email, function (err, user) {
      done(err, user);
    });
  });


function findByEmail(email, fn) {
    User.find({ email:email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        console.log(user)
        console.log("found")
        return fn(null, user[0]);
        }
       else {
        console.log("not found")
        return fn(null,null)
       }
    } )

} 

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
 


passport.use(new SamlStrategy({
    
    path: '/SSO/login/callback',
    entryPoint: 'https://dev-i5mfll-2.auth0.com/samlp/ISe3r0XrgUoKgchkvExvSPlqGecxhN67',
    issuer: 'urn:dev-i5mfll-2.auth0.com',
    cert : 'MIIDBzCCAe+gAwIBAgIJdA8L3kKw/hJnMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNVBAMTFmRldi1pNW1mbGwtMi5hdXRoMC5jb20wHhcNMTkwNTIxMTYwOTQ5WhcNMzMwMTI3MTYwOTQ5WjAhMR8wHQYDVQQDExZkZXYtaTVtZmxsLTIuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArdXfwRqiYJv9svF9UIN5xNpNBo0cKhfSSBVXh6EbsnkOM59Qpwo5wkraJwL2PLFLwv+pIhC0BlczWG/knMIdctuTIe2N4dMfBK4J/cRkB+ggQAgFaBo9BwFTn0C42TRcSF12cHu2oUV/8SxSNvaDPvKXZ+i02hIPdBgVDzBnmsHMpiH09Y4aQedOYA2WYW26aFZhUzLLy+LKHZW92dzElRMnCEgkowK24sOZcCgg3RkP2XHLfCMCusvkQu9a6vn8aN6SHXJE3j7fW8JGGI6c9a4d17PFJBYn0c5ZNcHc54WKmuit6FlEaBo0aSUmSaqAsJWSEzY4WMxZL3a2tw/lyQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBSNnHYN3Tc7ap+P8GDH8F8F3V7jVzAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBACny27EVLxoNMSJJpoRsJ3LDkMFsi6B7GkN1O0UQ8YxgXkI5mm19ijlpMqEaqe1mLVhjyIKsTap9C/mrhSVUu/DVBUTI+qqXr5m+WZFqtGBUfhm9X/cE7J1mixTQgx2Js6sGs0nCoeAKqb3uwg9RtM55QjfaAEj8osK0QKwRP1dPUE24Sgl8bU+UVLgaUOc39xBCSWUU40zmmJwKt3wRtotrh8Zjup+rJTqaHx8r8Etjigx/hx42U70jP9oQEKwNP4AN66OZbsbQ/rY39ad+xUM/lWm/vl/gXDqAuz+t5IWEcwt1GDbSnDnM8RL5mk56b/h1Dfx9miWVv4XavBjmE40=',
    logoutUrl: 'http://localhost:3000/SSO/logout/callback' 


    },
    function(profile, done) {
        console.log("inside function porfilel")
        console.log(profile)
        console.log('Succesfully Profile' + JSON.stringify(profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]));
        if (!profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]) {
            console.log("NO EMAIL");
            return done(new Error("No email found"), null);
        }
        console.log("i passed");
        process.nextTick(function() {
            console.log('process.nextTick' + profile);
            findByEmail(profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"], function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) { //o user den uparxie ton dhmiourgoume sthn bash
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
                        role: profile["http://schemas.auth0.com/roles"]
                    });
                    user
                    .save()
                 return done(null, user);
                }
                else //o user uparxei kai ton brhkame
                console.log("first" +user)
                console.log('Ending Method for profiling');
                //generate token 
                console.log("O USER EINAI OOO" +user);
                
                return done(null, user);
            })
            
        });
    }
));

 
 exports = module.exports = passport;