var db = require('../db/dbConfig.js');
var User = db.User;
var Reference = db.Reference;
var express = require('express');
var bodyParser = require('body-parser');

// Adds a user to the database. This is not currently being used.
module.exports.addUser = function(req, res) {
  var tempUser = new User(req.body);

  tempUser.save(function(err) {
    if (err) {
      console.log('There has been an error saving this User. Please see the addUser function in request-handler.js. Error is:', err);
      res.sendStatus(400);
    }
    res.sendStatus(201);
  })
};

// Returns an array of all users. Currently hooked up to the '/user' route. The
// only usefulness it currently has is for debugging purposes. 
module.exports.findAllUsers = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log('There has been an error finding all users. Please see the findAllUsers function in request-handler.js. Error is:', err);
      res.sendStatus(400);
    }
    res.send(users);
  });
};

// Finds a specific user. Used in the '/user/:username' API route. Profile.js utilizes this. 
module.exports.findUser = function(req, res) { 
  console.log('Params are:', req.params);
  var object = {username: req.params.username};
  User.find(object, function(err, user) {
    if (err) {
      console.log('There has been an error finding the user. Please see the findUser function in request-handler.js. Error is:', err);
      res.sendStatus(400);
    }
    res.send(user);
  });
};

// Hooked up through '/addreference'.
module.exports.addReference = function(req, res) {
  console.log(req.body);
  var tempReference = new Reference(req.body);
  tempReference.save(function(err) {
    if (err) {
      console.log('Error. See addReference() in request-handler.js. Error:', err);
      res.sendStatus(400);
    }
    res.sendStatus(201);
  });
};

// Hooked up through '/allreferences'. Currently is only useful for debugging purposes.
module.exports.findAllReferences = function(req, res) {
  Reference.find(function(err, refs) {
    if (err) {
      console.log('Error. See findAllReferences() in request-handler.js. Error:', err);
      res.sendStatus(400);
    }
    res.send(refs);
  });
};

// Finds by username. Used in Profile.js and hooked up through '/reference'.
module.exports.findReference = function(req, res) {
  var filter = {username: req.body.username};
  Reference.find(filter, function(err, ref) {
    if (err) {
      console.log('Error. See findReference() in request-handler.js. Error:', err);
      res.sendStatus(400);
    }
    res.send(ref);
  });
};


// Used to destroy the User database. Debugging functionality only.
module.exports.destroy = function(req, res) {
  Reference.remove({}, function() {
    User.remove({}, function() {
      res.send(200);
    });
  })
}

