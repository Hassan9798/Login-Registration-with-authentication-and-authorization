const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/users');
const initialize = (passport, email, getUserByEmail, getUserById) => {
  console.log(email);
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email: email });

    // const user = getUserByEmail(email);
    console.log(user);
    if (user === null || undefined) {
      return done(null, false, { message: 'User not found' });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, true, { message: 'success' }), user;
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    // return done(null, (id) =>
    //   User.findOne({ _id: id }).then((user) => console.log(user))
    // );
  });
};
module.exports = initialize;
