const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
module.exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
  } else {
    User.find({ email: req.body.email }, async function (err, users) {
      console.log(users);
      if (!users) {
        console.log('email is not available');
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt);
        let user = await new User({
          fullname: req.body.fullname,
          username: req.body.username,
          email: req.body.email,
          password: hashpassword,
          cnfmpassword: hashpassword,
          phoneno: req.body.phoneno,
        });
        user.save().then((user) => {
          jwt.sign(
            { id: user._id, username: user.username },
            process.env.Webtoken_Secret,
            { expiresIn: 900 },
            (err, token) => {
              if (err) throw err;

              res.send({ token, user });
            }
          );
        });
      }
    });
  }

  // let users = User.findOne({ email: req.body.email });
};
module.exports.hello = (req, res) => {
  res.send('HEY');
};
