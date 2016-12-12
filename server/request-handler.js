var db = require('../db/dbConfig.js');
var User = db.User;
var Reference = db.Reference;
var express = require('express');
var bodyParser = require('body-parser');

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

module.exports.findAllUsers = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log('There has been an error finding all users. Please see the findAllUsers function in request-handler.js. Error is:', err);
      res.sendStatus(400);
    }
    res.send(users);
  });
};

module.exports.findUser = function(req, res) {
  var object = {username: req.body.username, password: req.body.password};
  User.find(object, function(err, user) {
    if (err) {
      console.log('There has been an error finding the user. Please see the findUser function in request-handler.js. Error is:', err);
      res.sendStatus(400);
    }
    res.send(user);
  });
};

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

module.exports.findAllReferences = function(req, res) {
  Reference.find(function(err, refs) {
    if (err) {
      console.log('Error. See findAllReferences() in request-handler.js. Error:', err);
      res.sendStatus(400);
    }
    res.send(refs);
  });
};

module.exports.findReference = function(req, res) {
  var FakeObjectFromReq = {author: 'Fred'};
  Reference.find(FakeObjectFromReq, function(err, ref) {
    if (err) {
      console.log('Error. See findReference() in request-handler.js. Error:', err);
      res.sendStatus(400);
    }
    res.send(ref);
  });
};

module.exports.sendInvite = function (req, res) {
  // POST request to send reference invite email
  // call email helper funtion with email address and email text to send email
  console.log(req.url);
  res.sendStatus(201);
};
