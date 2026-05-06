const { body } = require('express-validator');

const userValidationRules = [
    body('firstName')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),

    body('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),

    body('mobile')
        .trim()
        .notEmpty().withMessage('Mobile number is required')
        .matches(/^\d{10}$/).withMessage('Mobile number must be exactly 10 digits'),

    body('gender')
        .notEmpty().withMessage('Gender is required')
        .isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),

    body('status')
        .notEmpty().withMessage('Status is required')
        .isIn(['Active', 'Inactive']).withMessage('Status must be Active or Inactive'),

    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 100 }).withMessage('Location cannot exceed 100 characters'),
];

const userUpdateValidationRules = [
    body('firstName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),

    body('lastName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),

    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),

    body('mobile')
        .optional()
        .trim()
        .matches(/^\d{10}$/).withMessage('Mobile number must be exactly 10 digits'),

    body('gender')
        .optional()
        .isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),

    body('status')
        .optional()
        .isIn(['Active', 'Inactive']).withMessage('Status must be Active or Inactive'),

    body('location')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('Location cannot exceed 100 characters'),
];

module.exports = { userValidationRules, userUpdateValidationRules };
