var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reference');



///////////////////////////// SCHEMA DEFINITIONS ////////////////////////////////
var userSchema = mongoose.Schema({
  id: Number,
  username: String,
  password: String,
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

var refSchema = mongoose.Schema({
  id: Number,
  author: String,
  authorDetails: {
    // Most recent is current company. If no current company -- pass null. ([null, Google, Apple, etc...])
    companies: Array,
    // 1-to-1 mapping with companies.
    roles: Array
    // Add properties as needed.
    // Here...
    // Here...
    // Etc ... 
  },
  reference: {
    header: String,
    body: String,
    // May not be used, but potentially worth having.
    ratings: Array
  }
});

//////////////////////////// CREATE MODELS ///////////////////////////////////

var User = mongoose.model('User', userSchema);
var Reference = mongoose.model('Reference', refSchema);

// We'll store our models here.
var models = {};
models.User = User;
models.Reference = Reference;

module.exports = models;