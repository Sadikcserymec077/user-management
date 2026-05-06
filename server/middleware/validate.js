const { validationResult } = require('express-validator');

/**
 * Middleware to check express-validator results and abort with 422 if invalid
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((err) => ({
            field: err.path,
            message: err.msg,
        }));
        return res.status(422).json({
            success: false,
            message: 'Validation failed',
            errors: formattedErrors,
        });
    }
    next();
};

module.exports = validate;
