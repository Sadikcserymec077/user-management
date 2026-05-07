import { useState, useRef, useEffect } from 'react';
import { FiUploadCloud, FiX, FiAlertCircle } from 'react-icons/fi';

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    gender: '',
    status: 'Active',
    location: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^\d{10}$/;

function validate(fields) {
    const errors = {};
    if (!fields.firstName.trim()) errors.firstName = 'First name is required';
    else if (fields.firstName.trim().length < 2) errors.firstName = 'Minimum 2 characters';

    if (!fields.lastName.trim()) errors.lastName = 'Last name is required';
    else if (fields.lastName.trim().length < 2) errors.lastName = 'Minimum 2 characters';

    if (!fields.email.trim()) errors.email = 'Email is required';
    else if (!EMAIL_REGEX.test(fields.email)) errors.email = 'Enter a valid email address';

    if (!fields.mobile.trim()) errors.mobile = 'Mobile number is required';
    else if (!MOBILE_REGEX.test(fields.mobile)) errors.mobile = 'Mobile must be exactly 10 digits';

    if (!fields.gender) errors.gender = 'Gender is required';
    if (!fields.status) errors.status = 'Status is required';
    if (!fields.location.trim()) errors.location = 'Location is required';

    return errors;
}

function FieldError({ msg }) {
    if (!msg) return null;
    return (
        <p className="form-error">
            <FiAlertCircle size={12} /> {msg}
        </p>
    );
}

export default function UserForm({ initialData = null, onSubmit, loading = false, submitLabel = 'Save User' }) {
    const [fields, setFields] = useState(initialData ? {
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        mobile: initialData.mobile || '',
        gender: initialData.gender || '',
        status: initialData.status || 'Active',
        location: initialData.location || '',
    } : INITIAL_STATE);

    const [errors, setErrors] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(
        initialData?.profileImage
            ? initialData.profileImage.startsWith('http')
                ? initialData.profileImage
                : `${(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace('/api', '')}/uploads/${initialData.profileImage}`
            : null
    );
    const [imageError, setImageError] = useState('');
    const fileRef = useRef(null);

    // Sync if initialData changes (edit form pre-fill)
    useEffect(() => {
        if (initialData) {
            setFields({
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                email: initialData.email || '',
                mobile: initialData.mobile || '',
                gender: initialData.gender || '',
                status: initialData.status || 'Active',
                location: initialData.location || '',
            });
            if (initialData.profileImage) {
                if (initialData.profileImage.startsWith('http')) {
                    setImagePreview(initialData.profileImage);
                } else {
                    const base = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace('/api', '');
                    setImagePreview(`${base}/uploads/${initialData.profileImage}`);
                }
            }
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowed.includes(file.type)) {
            setImageError('Only image files are allowed (jpeg, jpg, png, gif, webp)');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setImageError('Image size must be less than 5MB');
            return;
        }
        setImageError('');
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setImageError('');
        if (fileRef.current) fileRef.current.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(fields);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        Object.entries(fields).forEach(([key, val]) => formData.append(key, val));
        if (imageFile) formData.append('profileImage', imageFile);

        onSubmit(formData);
    };

    const inputStyle = (field) => ({
        borderColor: errors[field] ? 'var(--color-danger)' : undefined,
    });

    return (
        <form onSubmit={handleSubmit} noValidate>
            {/* ─── Profile Image Upload ─────────────────────── */}
            <div className="mb-6 flex flex-col items-center gap-3">
                {imagePreview ? (
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-28 h-28 rounded-3xl object-cover"
                            style={{ border: '3px solid var(--color-border)' }}
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white"
                            style={{ background: 'var(--color-danger)' }}
                            aria-label="Remove image"
                        >
                            <FiX size={14} />
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="w-28 h-28 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all"
                        style={{
                            background: 'var(--color-surface-2)',
                            border: `2px dashed ${imageError ? 'var(--color-danger)' : 'var(--color-border)'}`,
                            color: 'var(--color-text-muted)',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = imageError ? 'var(--color-danger)' : 'var(--color-border)')}
                    >
                        <FiUploadCloud size={28} />
                        <span className="text-xs font-medium">Upload Photo</span>
                    </button>
                )}
                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />
                {!imagePreview && (
                    <button
                        type="button"
                        className="text-xs underline transition-colors"
                        style={{ color: 'var(--color-primary)' }}
                        onClick={() => fileRef.current?.click()}
                    >
                        Choose image
                    </button>
                )}
                {imageError && <p className="form-error"><FiAlertCircle size={12} /> {imageError}</p>}
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Max 5MB — JPG, PNG, GIF, WEBP</p>
            </div>

            {/* ─── Form Grid ───────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* First Name */}
                <div>
                    <label className="form-label">First Name <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                    <input
                        className="form-input"
                        type="text"
                        name="firstName"
                        value={fields.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        style={inputStyle('firstName')}
                    />
                    <FieldError msg={errors.firstName} />
                </div>

                {/* Last Name */}
                <div>
                    <label className="form-label">Last Name <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                    <input
                        className="form-input"
                        type="text"
                        name="lastName"
                        value={fields.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        style={inputStyle('lastName')}
                    />
                    <FieldError msg={errors.lastName} />
                </div>

                {/* Email */}
                <div>
                    <label className="form-label">Email Address <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        value={fields.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        style={inputStyle('email')}
                    />
                    <FieldError msg={errors.email} />
                </div>

                {/* Mobile */}
                <div>
                    <label className="form-label">Mobile Number <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                    <input
                        className="form-input"
                        type="tel"
                        name="mobile"
                        value={fields.mobile}
                        onChange={handleChange}
                        placeholder="10-digit number"
                        maxLength={10}
                        style={inputStyle('mobile')}
                    />
                    <FieldError msg={errors.mobile} />
                </div>

                {/* Gender */}
                <div>
                    <label className="form-label">Gender <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                    <select
                        className="form-input"
                        name="gender"
                        value={fields.gender}
                        onChange={handleChange}
                        style={inputStyle('gender')}
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <FieldError msg={errors.gender} />
                </div>

                {/* Status */}
                <div>
                    <label className="form-label">Status <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                    <select
                        className="form-input"
                        name="status"
                        value={fields.status}
                        onChange={handleChange}
                        style={inputStyle('status')}
                    >
                        <option value="">Select status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <FieldError msg={errors.status} />
                </div>

                {/* Location — full width */}
                <div className="sm:col-span-2">
                    <label className="form-label">Location <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                    <input
                        className="form-input"
                        type="text"
                        name="location"
                        value={fields.location}
                        onChange={handleChange}
                        placeholder="City, Country"
                        style={inputStyle('location')}
                    />
                    <FieldError msg={errors.location} />
                </div>
            </div>

            {/* ─── Submit ─────────────────────────────────────── */}
            <div className="mt-8 flex justify-end">
                <button type="submit" className="btn btn-primary px-8" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin-slow" />
                            Saving…
                        </>
                    ) : submitLabel}
                </button>
            </div>
        </form>
    );
}
