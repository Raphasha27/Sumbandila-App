/**
 * Centralized error handling middleware
 * Catches all errors and returns consistent format
 */
const errorHandler = (err, req, res, next) => {
    console.error('[ERROR]', err.stack);

    // Handle specific error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation failed',
            details: err.message
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Authentication failed',
            details: err.message
        });
    }

    // Default server error
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
