var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var User = require('./../db/dbConfig.js').User;
var Reference = require('./../db/dbConfig.js').Reference;

// mongoose.connect('mongodb://localhost/reference');



// Hashes password
var hashPass = function (userPassword, saltRounds) {
  return bcrypt.hashSync(userPassword, saltRounds);
};

// Compares DB password hash with input user password
var comparePass = function(userPassword, dbHash, cb) {
  bcrypt.compare(userPassword, dbHash, function(err, res) {
    // res == true
    if (err) {
      console.log('hash compare err', err);
      return;
    }
    console.log('res hash compare', res);
    cb(res);
  });
};

// addUser handler for signup
var addUser = function(model, req, res) {

  var tempUser = new User({username: req.body.username, password: hashPass(req.body.password, salt), salt: salt});
  console.log(tempUser);
  tempUser.save(function(err) {
    if (err) {
      console.log('There has been an error saving this User. Please see the addUser function in request-handler.js. Error is:', err);
      res.sendStatus(400);
    }
    res.sendStatus(201);
  })
};

// findUser handler for login
var findUser = function(model, req, res, cb) {
  var object = {username: req.body.username};
  model.find(object, function(err, user) {
    if (err) {
      console.log('There has been an error finding the user. Please see the findUser function in request-handler.js. Error is:', err);
      res.sendStatus(400);
    }
    cb(user);
  });
};


module.exports = {
  hashPass: hashPass,
  comparePass: comparePass,
  addUser: addUser,
  findUser: findUser
};
