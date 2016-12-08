var bcrypt = require('bcrypt-nodejs');


// Hashes password
var hashPass = function (userPassword, saltRounds) {
  return bcrypt.hashSync(userPassword, saltRounds);
};

// Compares DB password hash with input user password
var comparePass = function(dbPass, dbHash, cb) {
  bcrypt.compare(dbPass, dbHash, function(err, res) {
    // res == true
    if (err) {
      console.log(err);
      return cb(err);
    }
    cb(null, res);
  });
};

module.exports = {
  hashPass: hashPass,
  comparePass: comparePass
};
