var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var handler = require('./request-handler.js');
var User = require('./../db/dbConfig.js').User;
var Reference = require('./../db/dbConfig.js').Reference;
var expressSession = require('express-session');
// var email = require('./email.js');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var auth = require('./hash.js');

app.use(expressSession({
  secret: 'ambitious-elm',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log('serializeUser called');
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser called');
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname + '../dist')));

app.use(express.static('dist'));
app.use('/node_modules', express.static('node_modules'));

// auth configuration
passport.use(new LocalStrategy(
  function(username, password, done) {
    // console.log('login hit');
    // console.log('req', req);
    // console.log('done', done);
    // console.log('username', username);
    // console.log('password', password);

    User.findOne({ 'username' :  username },
      function(err, user) {
        console.log('err', err);
        console.log('user', user);
        if (err)
          return done(err);
        if (!user){
          console.log('User Not Found with username ' + username);
          return done(null, false, {message: 'Incorrect Password!'});

        }
        auth.comparePass(password, user.password, function(err, isMatch) {
          console.log('password', password);
          console.log('user.password', user.password);
          if (!isMatch){
            console.log('Invalid Password');
            return done(null, false, {message: 'Incorrect Password!'});
          } else {
            return done(null, user.username);
          }
        });
      }
    );
}));

// passport.use('signup', new LocalStrategy({
//     passReqToCallback : true
//   },
//   function(req, username, password, done) {
//     findOrCreateUser = function(){
//       // find a user in Mongo with provided username
//       console.log('signup hit');
//       User.findOne({'username':username},function(err, user) {
//         // In case of any error return
//         if (err){
//           console.log('Error in SignUp: ', err);
//           return done(err);
//         }
//         // already exists
//         if (user) {
//           console.log('User already exists');
//           return done(null, false);
//         } else {
//           // if there is no user with that email
//           // create the user
//           var newUser = new User();
//           // set the user's local credentials
//           newUser.username = username;
//           // newUser.password = auth.hashPass(password);
//           newUser.password = password;
//
//           // newUser.email = req.param('email');
//           // newUser.firstName = req.param('firstName');
//           // newUser.lastName = req.param('lastName');
//
//           // save the user
//           newUser.save(function(err) {
//             if (err){
//               console.log('Error in Saving user: '+err);
//               throw err;
//             }
//             console.log('User Registration succesful');
//             return done(null, newUser);
//           });
//         }
//       });
//     };
//
//     // Delay the execution of findOrCreateUser and execute
//     // the method in the next tick of the event loop
//     process.nextTick(findOrCreateUser);
//   })
// );
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
// auth.comparePass(fakeUserData.password, savedHash, function(res) {
//   console.log('compared: ', res);
// });

//routes
app.post('/user', handler.addUser);

// app.get('/allusers', handler.findAllUser);

app.post('/signup', function(req, res) {
  console.log('signup', req.body);
  // handler.addUser(req, res);
  // var username = req.body.username;
  // res.send('received');
});

app.post('/login', passport.authenticate('local'), function(req, res) {
  // console.log('req.body', req.body);
  var username = req.body.username;
  handler.addUser(req, res);

  // console.log('signup', req.body);
  // res.send('received');
});

app.post('/login', function(req, res) {
  handler.findUser(req, res);
});

app.get('/user', handler.findUser);

app.post('/addreference',handler.addReference);

app.get('/allreferences', handler.findAllReferences);

app.get('/reference', handler.findReference);

app.post('/sendemail', handler.sendInvite);

app.listen(3000, function () {
  console.log('Server listening on port 3000')
});
