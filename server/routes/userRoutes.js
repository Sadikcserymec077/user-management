const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');
const { userValidationRules, userUpdateValidationRules } = require('../services/userValidation');
const {
    getUsers,
    searchUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    exportCSV,
} = require('../controllers/userController');

// NOTE: /search and /export/csv must be defined BEFORE /:id to avoid route conflicts

// @route   GET /api/users/export/csv
router.get('/export/csv', exportCSV);

// @route   GET /api/users/search?query=
router.get('/search', searchUsers);

// @route   GET /api/users?page=1&limit=10
router.get('/', getUsers);

// @route   GET /api/users/:id
router.get('/:id', getUserById);

// @route   POST /api/users
router.post(
    '/',
    upload.single('profileImage'),
    userValidationRules,
    validate,
    createUser
);

// @route   PUT /api/users/:id
router.put(
    '/:id',
    upload.single('profileImage'),
    userUpdateValidationRules,
    validate,
    updateUser
);

// @route   DELETE /api/users/:id
router.delete('/:id', deleteUser);

module.exports = router;
