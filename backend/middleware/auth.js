const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token from request headers
 * Protects routes that require authentication
 */
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({
            error: 'Access denied. No token provided.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        return res.status(403).json({
            error: 'Invalid or expired token.'
        });
    }
};

/**
 * Middleware to check if user is an admin
 * Must be used after verifyToken
 */
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            error: 'Access denied. Admin privileges required.'
        });
    }
};

module.exports = { verifyToken, isAdmin };
