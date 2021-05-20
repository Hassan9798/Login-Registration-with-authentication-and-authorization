const passport = require('passport');
const User = require('../../models/users');
module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    let id = user._id;
    id=id;
    done(null, id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(null, user);
    });
  });

  require('./strategies/localstrategy')();
}