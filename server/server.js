var express = require('express');
var email = require('./email.js');

var app = express();

app.use(express.static('public'));
app.use(express.static('dist'));
app.use('/node_modules', express.static('node_modules'));

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
})