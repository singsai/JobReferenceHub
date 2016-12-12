// ---------------------------- REQUIRE FILES ---------------------------- //

var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var handler = require('./request-handler.js');


// ---------------------------- INIT MIDDLEWARE ---------------------------- //

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static('dist'));

// Determine if this needs to be here. Why are we serving the node modules to the client?
app.use('/node_modules', express.static('node_modules'));


// ---------------------------- ROUTES - GET ---------------------------- //


app.get('/destroyall', handler.destroy);

app.get('/user/:username', handler.findUser)

app.get('/user', handler.findAllUsers);

app.get('/allreferences', handler.findAllReferences);


// ---------------------------- ROUTES - POST ---------------------------- //

app.post('/addreference',handler.addReference);

app.post('/reference', handler.findReference);

app.post('/user', handler.addUser);


// ---------------------------- SERVER LISTEN ---------------------------- //

app.listen(3000, function () {
  console.log('Server listening on port 3000')
});
