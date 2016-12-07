var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reference');

// Define our connection object.
var db = mongoose.connection();
db.once('open', function() {
  // connected
});

///////////////////////////// SCHEMA DEFINITIONS ////////////////////////////////
var userSchema = mongoose.Schema({
  id: Number,
  firstName: String,
  middleName: String,
  lastName: String,
  
  // This can and should be expanded to include all needed data fields.
  profileInfo: {
    schools: Array,
    pastEmployers: Array,
    description: String,
    joinedAt: {type: Date, default: Date.now},
  },
  
  // This stores the references. May need to be modified to make searching for specific
  // references constant time. Since no person will likely have a large number of refs,
  // (from a CS perspective), this optimization may not be necessary. 
  references: Array
});

//////////////////////////// CREATE MODELS ///////////////////////////////////

var User = mongoose.model('User', userSchema);

module.exports = User;