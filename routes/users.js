const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const { check } = require('express-validator');
router.post(
  '/adduser',
  [
    check('fullname', 'full name must be 5+ character')
      .exists()
      .isLength({ min: 5 }),
    check('username', 'username must be 5+ character')
      .exists()
      .isLength({ min: 5 }),
    check('email', 'email is not valid').isEmail().normalizeEmail(),
    check('password', 'password must be 5+ character')
      .exists()
      .isLength({ min: 5 }),
    check('confirmpassword')
      .trim()
      .isLength({ min: 5 })

      .withMessage('Password must be between 5 to 16 characters')

      .custom(async (cnfmpassword, { req }) => {
        const password = req.body.password;
        if (password !== cnfmpassword) {
          throw new Error('Passwords must be same');
        }
      }),
    check('phoneno', 'phone no is required').exists(),
  ],
  users.signup
);

router.get('/hello', users.hello);

module.exports = router;
