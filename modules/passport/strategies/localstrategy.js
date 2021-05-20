const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../../../models/users');
const jwt = require('jsonwebtoken');
// const Donor = require('../../../Models/Donor');

module.exports = function () {
  passport.use('local-user', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      let query = User.findOne({ email: email });
      query.select('email password userRole blocked');
      query.exec(function (error, user) {
        if (error) {
          done(error, null);
        } else if (user) {
            console.log(user);
          bcrypt.compare(password, user.password, function (err, valid) {
            if (valid) {
              if (user.blocked) {
                done(err, null); //user has been blocked
              } else {
               
                done(null, user);
              }
            } else {
              done(err, null);
            }
          });
        } else {
          done(error, null);
        }
      });
    }
  ));
}