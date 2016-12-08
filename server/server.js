var express = require('express');
var path = require('path');

//app.use(bodyParser.urlencoded({extended: true}))
//app.use('/', express.static(path.join(__dirname + '../dist')));

var handler = require('./request-handler.js');

var app = express();

app.use(express.static('dist'));
app.use('/node_modules', express.static('node_modules'));;

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