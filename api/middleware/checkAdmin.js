// middleware/checkAdmin.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json('Not authorized');
  
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) return res.status(403).json('Invalid or expired token');

    const userDoc = await User.findById(info.id);
    if (!userDoc || !userDoc.isAdmin) {
      return res.status(403).json('You do not have admin privileges');
    }

    req.user = userDoc; // Attach user document to request object
    next();
  });
};
