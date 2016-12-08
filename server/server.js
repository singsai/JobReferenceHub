var express = require('express');
var app = express();
var path = require('path');

//app.use('/static', express.static('../dist'));
//app.use(bodyParser.urlencoded({extended: true}))
//app.use('/', express.static(path.join(__dirname + '../dist')));
app.use('/', express.static('dist'));

// app.get('/', function(req, res) {
//   res.send('hello');
// });
var port = 3000;
app.listen(port, function() {
  console.log('Listening on', port);
});