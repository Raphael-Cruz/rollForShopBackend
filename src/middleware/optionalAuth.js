// middleware/optionalAuth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // sem token — deixa passar como anônimo
        return next();
    }

    try {
        const token = authHeader.split(' ')[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
    } catch (err) {
    }

    next();
};