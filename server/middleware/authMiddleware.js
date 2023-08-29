// authMiddleware.js
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization; // Get the token from the request headers

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = decodedToken; // Set the user object in the request
    next();
  });
};

module.exports = requireAuth;
