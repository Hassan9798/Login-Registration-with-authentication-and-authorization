const passport = require('passport');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./auth-middleware');

module.exports.Login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  console.log(user);
  if (user === null || undefined) {
    console.log('user is not found');
  } else {
    try {
      await bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (!isMatch) {
          res.send('invlaid email or password');
          res.status(400).json({ msg: 'invalid password or email' });
        } else {
          jwt.sign(
            { id: user._id, username: user.username },
            process.env.Webtoken_Secret,
            { expiresIn: 900 },
            (err, token) => {
              if (err) throw err;

              res.send(token);
            }
          );
        }
      });

      console.log('login successfully');
    } catch (e) {
      return e;
    }
  }
};
module.exports.authenticate = (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
};
