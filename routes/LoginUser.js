const LoginUser = require('../controllers/login_User');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../controllers/auth-middleware');
// router.get('/login', LoginUser.getUser);
// router.post(
//   '/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: false,
//   })
// );
router.post('/login', LoginUser.Login);
router.get('/auth', auth, LoginUser.authenticate);
module.exports = router;
