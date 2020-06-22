var passport = require('passport'),
    LdapStrategy = require('passport-ldapauth').Strategy;
const User = require("../models/user");
const mongoose = require("mongoose");

var OPTS = {
        server: {
        url: process.env.LDAP_URL,
        bindDn: process.env.BIND_DN, //Change to a valid dn
        bindCredentials: process.env.DN_PASS, //Change to DN's valid password
        searchBase: process.env.SRCH_BASE,
        searchFilter: 'userPrincipalName={{username}}',
        searchAttributes: ['mail', 'givenName', 'sn', 'title', 'company']
        },
        usernameField: 'email',
        passwordField: 'password'
    };

passport.serializeUser(function(user,done){
    done(null, user.email);
});

passport.deserializeUser(function(user,done){
    findByEmail(email, function(err, done){
        done(err, user);
    });
});

passport.use(new LdapStrategy(OPTS,function(user, done){
    console.log('User email from Ldap answer is: ' + user.mail);
    process.nextTick(function(){
        findByEmail(user.mail, function(err, localUser){
            if (err) return done(err);
            // console.log('Trying to check if ldap user is local user');
            if(!localUser){
                userTitle = checkRole(user.title);
                const userUniversity = checkUniversity(user.company);
                const luser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: user.mail,
                    role: userTitle,
                    name: user.givenName,
                    lastname: user.sn,
                    university: userUniversity
                });
                luser.save()
                .then(result => {
                    console.log('Ldap User saved in local db with mail: ' + luser.email);         
                })
                .catch( err => {
                    console.log(err);
                })
                return done(null, localUser);
            }
            return done(null, localUser);
        });
    });
}));

function findByEmail(email, done) {
    User.find({ email:email })
    .exec()
    .then(localUser => {
        if (localUser.length >= 1) {
            // console.log('localUser is: ' + localUser);
            return done(null, localUser[0]);
        }
        else {
            console.log("localUser not found");
            return done(null,null);
        }
    })
    .catch( err => {
        console.log(err);
    })
}

function setUniversity(req,res,next)  {
    this.university=req.body.university;
    return next();
}

function checkRole(ldapRole){
    let userTitle;
    switch(ldapRole){
        case 'Προπτυχιακός Φοιτητής':
            userTitle = 'Student';
            return userTitle;
        case 'Επίκουρος Καθηγητής':
        case 'Καθηγητής':
        case 'Λέκτορας':
        case 'Ομότιμος Καθηγητής':
        case 'Αναπληρωτής Καθηγητής':
            userTitle = 'Professor'
            return userTitle;
        case 'Διοικητικό Προσωπικό':
            userTitle = 'Secretariat';
            return userTitle;
        default:
            userTitle = 'Guest';
            return userTitle;
    }
}

function checkUniversity(ldapUniversity){
    let userUniversity;
    switch(ldapUniversity){
        case 'Χαροκόπειο Πανεπιστήμιο':
            userUniversity = '303030303030303030303031';
            return userUniversity;
    }
}

exports = module.exports = {passport,setUniversity} ;