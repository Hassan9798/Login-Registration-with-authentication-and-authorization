require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-token-header');
  if (!token) {
    res.status(401).json({ msg: 'no token found' });
  }
  try {
    const decoded = jwt.verify(token, process.env.Webtoken_Secret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ msg: 'invlalid token' });
  }
};
module.exports = auth;
