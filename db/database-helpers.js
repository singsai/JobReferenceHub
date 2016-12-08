var db = require('/database-helpers.js');
var User = db.User;
var Reference = db.Reference;

/*

  DOCUMENTATION
  
  --------------------------------------------------------------------------
  
  addUser = function(object, cb) {
    // Adds a user to the database. The object defines the user's properties. Assign the
    // result of this function to a variable. Callback will be run on newly created User.
    //
    // WARNING: This is an async function. 
  }
  
    Example:  addUser({
                name: 'Bob',
                age: 15,
                dog: 'Joey'
              }, function(user) {
                var bobby = user;
              });

  --------------------------------------------------------------------------

  findAllUsers = function(cb) {
    // Returns all documents in the database for the User model. [If more models are added,
    // it will be necessary to add a specification parameter.]
    //
    // WARNING: This is an async function.
  }
  
  --------------------------------------------------------------------------
  
  findUser = function(object, cb) {
    // Finds a particular document or documents that have the properties listen on object.
    //
    // WARNING: This is an async function. 
  }
  
  --------------------------------------------------------------------------
  
  // ABOVE DOCUMENTATION APPLIES TO addReference, findAllReferences, and findReference. CROSS
  // APPLY THE LOGIC.
  
  --------------------------------------------------------------------------
  
*/

// We will store all of our methods on here, for easy export.
var h = {};

h.addUser = function(object, cb) {
  var tempUser = new User(object);
  
  tempUser.save(function(err) {
    if (err) {
      console.log('There has been an error saving this User. Please see the addUser function in database-helpers.js. Error is:', err);
    }
    if (cb) {
      cb(tempUser);
    }
  })
};

h.findAllUsers = function(cb) {
  User.find(function(err, users) {
    if (err) {
      console.log('There has been an error finding all users. Please see the findAll function in database-helpers.js. Error is:', err);
    }
    cb(users);
  });
};

h.findUser = function(object, cb) {
  User.find(object, cb);
};

h.addReference = function(object, cb) {
  var tempReference = new Reference(object);
  
  tempReference.save(function(err) {
    if (err) {
      console.log('Error. See addReference() in database-helpers.js. Error:', err);
    }
    if (cb) {
      cb(tempReference);
    }
  });
};

h.findAllReferences = function(cb) {
  Reference.find(function(err, refs) {
    if (err) {
      console.log('Error. See findAllReference() in database-helpers.js. Error:', err);
    }
    cb(refs);
  });
};

h.findReference = function(object, cb) {
  Reference.find(object, cb);
};

// Export
module.exports = h;



