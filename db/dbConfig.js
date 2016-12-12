// ---------------------------- REQUIRE FILES ---------------------------- //

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// ---------------------------- CONNECT TO MONGOOSE ---------------------------- //

mongoose.connect('mongodb://localhost/reference');

// ---------------------------- DEFINE SCHEMAS ---------------------------- //

var userSchema = new Schema({
  username: String,
  password: String,
  hash: String,
  firstName: String,
  // middleName: String,
  lastName: String,
  //
  // // This can and should be expanded to include all needed data fields.
  profileInfo: {
    // schools: Array,
    // companies: Array,
    currentCompany: String,
    role: String,
    // pastEmployers: Array,
    // description: String,
    joinedAt: {type: Date, default: Date.now},
    img: String
  }
});

var refSchema = new Schema({
  
  authorUsername: String,
  referencedUsername: String, 
  header: String,
  body: String
  
});


// ---------------------------- CREATE MODELS ---------------------------- //

var User = mongoose.model('User', userSchema);
var Reference = mongoose.model('Reference', refSchema);


// ---------------------------- STORE AND EXPORT MODELS ---------------------------- //

var models = {};
models.User = User;
models.Reference = Reference;

module.exports = models;
