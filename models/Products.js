const mongoose = require('mongoose');
const product = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  producttype: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  product: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  displayimage: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('product', product);
