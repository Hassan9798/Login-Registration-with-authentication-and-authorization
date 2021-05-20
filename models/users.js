const mongoose = require('mongoose');
const Joi = require('joi');
const User = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  cnfmpassword: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  phoneno: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 255,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Users', User);

