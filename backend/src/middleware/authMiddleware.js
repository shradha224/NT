const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'navya_dev_secret_do_not_use_in_prod';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
  }
  next();
};

module.exports = { authenticate, requireRole };
