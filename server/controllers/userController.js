const { Parser } = require('json2csv');
const User = require('../models/User');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');
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
            currentPage: page,
            totalPages,
            totalUsers,
            users: users
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

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const existingMobile = await User.findOne({ mobile });
        if (existingMobile) {
            return res.status(400).json({
                success: false,
                message: "Mobile number already exists"
            });
        }

        let profileImage = null;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            profileImage = result.secure_url;
        }

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

        const existingEmail = await User.findOne({ email, _id: { $ne: req.params.id } });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const existingMobile = await User.findOne({ mobile, _id: { $ne: req.params.id } });
        if (existingMobile) {
            return res.status(400).json({
                success: false,
                message: "Mobile number already exists"
            });
        }

        // Handle image replacement with Cloudinary
        let profileImage = user.profileImage;
        if (req.file) {
            // Delete old image file if it exists remotely
            if (user.profileImage) {
                await deleteFromCloudinary(user.profileImage);
            }
            const result = await uploadToCloudinary(req.file.buffer);
            profileImage = result.secure_url;
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

        // Remove profile image from Cloudinary if present
        if (user.profileImage) {
            await deleteFromCloudinary(user.profileImage);
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
