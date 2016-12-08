var bcrypt = require('bcrypt-nodejs');


// Hashes password
var hashPass = function (userPassword, saltRounds) {
  return bcrypt.hashSync(userPassword, saltRounds);
};

// Compares DB password hash with input user password
var comparePass = function(userPassword, dbHash, cb) {
  bcrypt.compare(userPassword, dbHash, function(err, res) {
    // res == true
    if (err) {
      console.log(err);
      return;
    }
    cb(res);
  });
};

module.exports = {
  hashPass: hashPass,
  comparePass: comparePass
};
