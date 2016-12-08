var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var app = express();
var path = require('path');
var handler = require('./request-handler.js');
var User = require('./../db/dbConfig.js').User;
var Reference = require('./../db/dbConfig.js').Reference;
var expressSession = require('express-session');
// var email = require('./email.js');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var auth = require('./hash.js');

app.use(expressSession({
  secret: 'ambitious-elm',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//app.use(bodyParser.urlencoded({extended: true}))
//app.use('/', express.static(path.join(__dirname + '../dist')));

app.use(express.static('dist'));
app.use('/node_modules', express.static('node_modules'));

// auth configuration
passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' :  username },
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false,
                req.flash('message', 'User Not found.'));
        }
        // User exists but wrong password, log the error
        auth.comparePass(user.password, password, function(err, isMatch) {
          if (!isMatch){
            console.log('Invalid Password');
            return done(null, false,
                req.flash('message', 'Invalid Password'));
          }
        });

        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
      }
    );
}));

passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    findOrCreateUser = function(){
      // find a user in Mongo with provided username
      User.findOne({'username':username},function(err, user) {
        // In case of any error return
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists');
          return done(null, false,
             req.flash('message','User Already Exists'));
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.username = username;
          newUser.password = auth.hashPass(password);
          newUser.email = req.param('email');
          newUser.firstName = req.param('firstName');
          newUser.lastName = req.param('lastName');

          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);
              throw err;
            }
            console.log('User Registration succesful');
            return done(null, newUser);
          });
        }
      });
    };

    // Delay the execution of findOrCreateUser and execute
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  })
);
// var account = require('../db/database-config');
// passport.use(new LocalStrategy(account.User.authenticate()));
// passport.serializeUser(account.User.serializeUser());
// passport.deserializeUser(account.User.deserializeUser());


//fake user data for testing
var fakeUserData = {
  username: 'Kai',
  email: 'kaitheboss@aol.com',
  password: 'hellonurse',
  references: [{stars: 5, text: 'Kai is the cuttest'}, {stars: 2, text: 'worked with Kai, was soso'}]
};

// testing hashing
// var savedHash = auth.hashPass(fakeUserData.password, salt);
// console.log('hashed', savedHash);
// auth.comparePass(fakeUserData.password, savedHash, function(err, res) {
//   console.log('compared: ', res);
// });

//routes
app.post('/user', handler.addUser);

// app.get('/allusers', handler.findAllUser);

app.get('/user', handler.findUser);

app.post('/addreference',handler.addReference);

app.get('/allreferences', handler.findAllReferences);

app.get('/reference', handler.findReference);

app.post('/sendemail', handler.sendInvite);

app.listen(3000, function () {
  console.log('Server listening on port 3000')
});
