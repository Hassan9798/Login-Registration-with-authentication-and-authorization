const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userroutes = require('./routes/auth/users');
const flash = require('flash');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

mongoose
  .connect(
    'mongodb+srv://Hasan:hasan@cluster0.7iiqm.mongodb.net/Users?retryWrites=true&w=majority'
  )
  .then(() => console.log('database connected'));

app.use(express.json());
app.use(cors());
app.use(session({
  secret: 'MySecretKey',
  saveUninitialized: true,
  resave: true,
  cookie: {
      httpOnly: false,
      secure: false,
  }
}));

// use passport JS Module for authentication purposes.
require('./modules/passport/passport')(app);
// Login Routes
const loginRoutes = require('./routes/auth/LoginRoutes');
app.use('/user', loginRoutes);

/*Register Routes */
app.use('/user', userroutes);


app.listen(process.env.PORT || 4000, () => {
  console.log('server is running');
});
