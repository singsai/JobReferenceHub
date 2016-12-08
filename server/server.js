var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
// var email = require('./email.js');

var app = express();

app.use(require('express-session')({
    secret: 'ambitious-elm',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(express.static('dist'));
app.use('/node_modules', express.static('node_modules'));

// auth configuration
var account = require('../db/database-config');
passport.use(new LocalStrategy(account.User.authenticate()));
passport.serializeUser(account.User.serializeUser());
passport.deserializeUser(account.User.deserializeUser());


//fake user data for testing
var fakeUserData = {
  username: 'Kai',
  email: 'kaitheboss@aol.com',
  references: [{stars: 5, text: 'Kai is the cuttest'}, {stars: 2, text: 'worked with Kai, was soso'}]
};

//routes

app.get('/user', function (req, res) {
  // GET request to get user info
  // calling DB helper function with username to retrieve user data from DB and send it back to client

  console.log(req.url);
  res.send(fakeUserData);
});

app.post('/register', function (req, res) {
  account.user.register(new account.user({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
        return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
        res.redirect('/sendmail');
    });
  });
});

app.post('/sendemail', function (req, res) {
  // POST request to send reference invite email
  // call email helper funtion with email address and email text to send email
  console.log(req.url);
  res.sendStatus(201);
});

app.post('/postreference', function (req, res) {
  // POST request to write references for outher useers
  // call DB helper function with reference text to store reference in DB under according user
  // something like:
  // DBhelper.createReference(fakeUserData.username, fakeUserData.references[0], callback? )
  res.sendStatus(201);
})

app.listen(3000, function () {
  console.log('Server listening on port 3000')
});
