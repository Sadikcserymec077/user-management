const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer, folder = 'mern_users') => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

const deleteFromCloudinary = async (url) => {
    if (!url || !url.includes('cloudinary.com')) return;
    try {
        const parts = url.split('/');
        const filename = parts.pop();
        const folder = parts.pop();
        const public_id = `${folder}/${filename.split('.')[0]}`;
        await cloudinary.uploader.destroy(public_id);
    } catch (err) {
        console.error('Cloudinary destruction error:', err);
    }
};

module.exports = { cloudinary, uploadToCloudinary, deleteFromCloudinary };
