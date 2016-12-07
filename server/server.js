var express = require('express');

var app = express();

app.use(express.static('public'));
app.use(express.static('dist'));
app.use('/node_modules', express.static('node_modules'));

app.get('/user', function (req, res) {
  // GET request to get user info
  // calling DB helper function with username to retrieve user data from DB and send it back to client
  console.log(req.url);
});

app.post('/sendemail', function (req, res) {
  // POST request to send reference invite email
  // call email helper funtion with email address and email text to send email
  console.log(req.url);
});

app.listen(3000, function () {
  console.log('Server listening on port 3000')
})