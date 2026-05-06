/**
 * Standardized API response helpers
 */

const sendSuccess = (res, message = 'Success', data = null, statusCode = 200) => {
    const payload = { success: true, message };
    if (data !== null) payload.data = data;
    return res.status(statusCode).json(payload);
};

const sendError = (res, message = 'Something went wrong', statusCode = 500) => {
    return res.status(statusCode).json({ success: false, message });
};

module.exports = { sendSuccess, sendError };
