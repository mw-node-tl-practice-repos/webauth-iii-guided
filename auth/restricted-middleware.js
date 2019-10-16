const jwt = require('jsonwebtoken');
const secret = require('../config/secrets')
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secret.jwtSecret, (err, decoded) => {
      if (err) {
        // FOWL play hehehe
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        // Token came bawk verified!
        req.username = decoded.username
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
