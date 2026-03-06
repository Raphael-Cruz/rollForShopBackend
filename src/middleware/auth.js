const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, access denied' });

  }

  try {

    const token = authHeader.split(' ')[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();
  } catch (err) {
    console.log("VERIFY SECRET:", process.env.JWT_SECRET);
    return res.status(401).json({ message: 'Invalid or expired token' });

  }
};