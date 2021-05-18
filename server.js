const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userroutes = require('./routes/users');
const LoginUser = require('./routes/LoginUser');
const passport = require('passport');
const User = require('./models/users');
const initializePassport = require('./controllers/passport_authuser');
const flash = require('flash');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

// initializePassport(
//   passport,
//   (email) => {
//     return User.find({ email: email });
//   },
//   (id) => User.find((user) => user._id === id)
// );

mongoose
  .connect(
    'mongodb+srv://Hasan:hasan@cluster0.7iiqm.mongodb.net/Users?retryWrites=true&w=majority'
  )
  .then(() => console.log('database connected'));

app.use(express.json());
app.use(cors());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(
//   session({
//     secret: process.env.Session_Secret,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(flash());

/*Routes Middlewares */
app.use('/app', userroutes);
app.use('/user', LoginUser);
app.listen(process.env.PORT || 4000, () => {
  console.log('server is running');
});
