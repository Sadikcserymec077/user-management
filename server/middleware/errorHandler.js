/**
 * Global Express error-handling middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.message}`);

    // Multer errors
    if (err.name === 'MulterError') {
        const message =
            err.code === 'LIMIT_FILE_SIZE'
                ? 'File size must be less than 5MB'
                : err.message;
        return res.status(400).json({ success: false, message });
    }

    // Custom multer file filter error
    if (err.message && err.message.includes('Only image files')) {
        return res.status(400).json({ success: false, message: err.message });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(422).json({ success: false, message: messages.join(', ') });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({
            success: false,
            message: `A user with this ${field} already exists`,
        });
    }

    // Mongoose CastError (invalid ObjectId)
    if (err.name === 'CastError') {
        return res.status(400).json({ success: false, message: 'Invalid resource ID' });
    }

    // Generic fallback
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal server error',
    });
};

module.exports = errorHandler;
