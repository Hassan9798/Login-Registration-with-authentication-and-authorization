const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const User = require('../models/users');
const bcrypt = require('bcrypt');

router.post('/adduser', users.signup);

router.get('/hello', users.hello);

module.exports = router;
