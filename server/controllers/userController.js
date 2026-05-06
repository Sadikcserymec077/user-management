const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/responseHelper');

// ─── GET ALL USERS (Paginated) ───────────────────────────────────────────────
const getUsers = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
        const skip = (page - 1) * limit;

        const [users, totalUsers] = await Promise.all([
            User.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
            User.countDocuments(),
        ]);

        const totalPages = Math.ceil(totalUsers / limit);

        return res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: users,
            currentPage: page,
            totalPages,
            totalUsers,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        });
    } catch (error) {
        next(error);
    }
};

// ─── SEARCH USERS ────────────────────────────────────────────────────────────
const searchUsers = async (req, res, next) => {
    try {
        const { query } = req.query;
        if (!query || query.trim() === '') {
            return sendError(res, 'Search query is required', 400);
        }

        const regex = new RegExp(query.trim(), 'i');
        const users = await User.find({
            $or: [
                { firstName: regex },
                { lastName: regex },
                { email: regex },
                { mobile: regex },
                { location: regex },
            ],
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: `Found ${users.length} result(s)`,
            data: users,
            totalUsers: users.length,
        });
    } catch (error) {
        next(error);
    }
};

// ─── GET SINGLE USER ─────────────────────────────────────────────────────────
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return sendError(res, 'User not found', 404);
        return sendSuccess(res, 'User fetched successfully', user);
    } catch (error) {
        next(error);
    }
};

// ─── CREATE USER ─────────────────────────────────────────────────────────────
const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, mobile, gender, status, location } = req.body;

        // Duplicate email check
        const existing = await User.findOne({ email: email.toLowerCase().trim() });
        if (existing) return sendError(res, 'A user with this email already exists', 409);

        const profileImage = req.file ? req.file.filename : null;

        const user = await User.create({
            firstName,
            lastName,
            email,
            mobile,
            gender,
            status,
            location,
            profileImage,
        });

        return sendSuccess(res, 'User created successfully', user, 201);
    } catch (error) {
        next(error);
    }
};

// ─── UPDATE USER ─────────────────────────────────────────────────────────────
const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return sendError(res, 'User not found', 404);

        const { firstName, lastName, email, mobile, gender, status, location } = req.body;

        // Duplicate email check excluding this user
        if (email) {
            const existing = await User.findOne({
                email: email.toLowerCase().trim(),
                _id: { $ne: req.params.id },
            });
            if (existing) return sendError(res, 'Another user with this email already exists', 409);
        }

        // Handle image replacement
        let profileImage = user.profileImage;
        if (req.file) {
            // Delete old image file if it exists
            if (user.profileImage) {
                const oldImagePath = path.join(__dirname, '..', 'uploads', user.profileImage);
                if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
            }
            profileImage = req.file.filename;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, email, mobile, gender, status, location, profileImage },
            { new: true, runValidators: true }
        );

        return sendSuccess(res, 'User updated successfully', updatedUser);
    } catch (error) {
        next(error);
    }
};

// ─── DELETE USER ─────────────────────────────────────────────────────────────
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return sendError(res, 'User not found', 404);

        // Remove profile image if present
        if (user.profileImage) {
            const imagePath = path.join(__dirname, '..', 'uploads', user.profileImage);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await user.deleteOne();
        return sendSuccess(res, 'User deleted successfully', null);
    } catch (error) {
        next(error);
    }
};

// ─── EXPORT CSV ──────────────────────────────────────────────────────────────
const exportCSV = async (req, res, next) => {
    try {
        const users = await User.find().sort({ createdAt: -1 }).lean();

        if (users.length === 0) {
            return sendError(res, 'No users found to export', 404);
        }

        const fields = [
            { label: 'First Name', value: 'firstName' },
            { label: 'Last Name', value: 'lastName' },
            { label: 'Email', value: 'email' },
            { label: 'Mobile', value: 'mobile' },
            { label: 'Gender', value: 'gender' },
            { label: 'Status', value: 'status' },
            { label: 'Location', value: 'location' },
            { label: 'Profile Image', value: 'profileImage' },
            { label: 'Created At', value: 'createdAt' },
            { label: 'Updated At', value: 'updatedAt' },
        ];

        const parser = new Parser({ fields });
        const csv = parser.parse(users);

        const date = new Date().toISOString().slice(0, 10);
        const filename = `users_export_${date}.csv`;

        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', `attachment; filename="${filename}"`);
        return res.send(csv);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    searchUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    exportCSV,
};
