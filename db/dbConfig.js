var mongoose = require('mongoose');
// var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/reference');

///////////////////////////// SCHEMA DEFINITIONS ////////////////////////////////
var userSchema = new Schema({
  id: Number,
  username: String,
  password: String,
  hash: String,
  // firstName: String,
  // middleName: String,
  // lastName: String,
  //
  // // This can and should be expanded to include all needed data fields.
  profileInfo: {
    // schools: Array,
    // companies: Array,
    currentCompany: String,
    role: String,
    // pastEmployers: Array,
    // description: String,
    joinedAt: {type: Date, default: Date.now}
  }
  //
  // // This stores the references. May need to be modified to make searching for specific
  // // references constant time. Since no person will likely have a large number of refs,
  // // (from a CS perspective), this optimization may not be necessary.
  // references: Array
});

var refSchema = new Schema({
  id: Number,
  reference: {
    authorId: Number, //Author
    applicantId: Number, //The person this reference is about
    header: String,
    body: String,
    // May not be used, but potentially worth having.
    ratings: Array
  }
});

// salting and hashing for passport
// userSchema.plugin(passportLocalMongoose);
// refSchema.plugin(passportLocalMongoose);

//////////////////////////// CREATE MODELS ///////////////////////////////////

var User = mongoose.model('User', userSchema);
var Reference = mongoose.model('Reference', refSchema);

// We'll store our models here.
var models = {};
models.User = User;
models.Reference = Reference;

module.exports = models;
