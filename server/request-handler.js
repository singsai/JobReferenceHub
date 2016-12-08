var db = require('../db/dbConfig.js');
var User = db.User;
var Reference = db.Reference;
var express = require('express');


var h = {};

h.addUser = function(req, res) {
  var tempUser = new User(object);

  tempUser.save(function(err) {
    if (err) {
      console.log('There has been an error saving this User. Please see the addUser function in request-handler.js. Error is:', err);
      res.sendStatus(400);
    }
    res.sendStatus(201);
  })
};

h.findAllUsers = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log('There has been an error finding all users. Please see the findAllUsers function in request-handler.js. Error is:', err);
      res.sendStatus(400);
    }
    res.send(users);
  });
};

h.findUser = function(req, res) {
  var FakeObjectFromReq = {username: 'Fred'};
  User.find(FakeObjectFromReq, function(err, user) {
    if (err) {
      console.log('There has been an error finding the user. Please see the findUser function in request-handler.js. Error is:', err);
      res.sendStatus(400);
    }
    res.send(user);
  });
};

h.addReference = function(req, res) {
  var tempReference = new Reference(object);

  tempReference.save(function(err) {
    if (err) {
      console.log('Error. See addReference() in request-handler.js. Error:', err);
      res.sendStatus(400);
    }
    res.sendStatus(201);
  });
};

h.findAllReferences = function(req, res) {
  Reference.find(function(err, refs) {
    if (err) {
      console.log('Error. See findAllReferences() in request-handler.js. Error:', err);
      res.sendStatus(400);
    }
    res.send(refs);
  });
};

h.findReference = function(req, res) {
  var FakeObjectFromReq = {author: 'Fred'};
  Reference.find(FakeObjectFromReq, function(err, ref) {
    if (err) {
      console.log('Error. See findReference() in request-handler.js. Error:', err);
      res.sendStatus(400);
    }
    res.send(ref);
  });
};

h.sendInvite = function (req, res) {
  // POST request to send reference invite email
  // call email helper funtion with email address and email text to send email
  console.log(req.url);
  res.sendStatus(201);
};

// Export
module.exports = h;
