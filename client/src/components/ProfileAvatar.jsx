import { useState } from 'react';
import { FiUser } from 'react-icons/fi';

const SOLID_COLORS = [
    '#4f46e5',
    '#0284c7',
    '#16a34a',
    '#d97706',
    '#c026d3',
];

function getColor(name = '') {
    const index = (name.charCodeAt(0) || 0) % SOLID_COLORS.length;
    return SOLID_COLORS[index];
}

export default function ProfileAvatar({ src, name = '', size = 40, className = '' }) {
    const [imgError, setImgError] = useState(false);
    const initials = name
        ? name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
        : '';
    const bgColor = getColor(name);

    const style = {
        width: size,
        height: size,
        minWidth: size,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.36,
        fontWeight: 700,
        color: '#fff',
        background: bgColor,
        border: '1px solid rgba(255,255,255,0.1)',
        flexShrink: 0,
    };

    // Resolve full image URL (handles both local uploads and Cloudinary URLs)
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace('/api', '');
    const fullSrc = src
        ? src.startsWith('http') ? src : `${baseUrl}/uploads/${src}`
        : null;

    if (fullSrc && !imgError) {
        return (
            <div style={style} className={className}>
                <img
                    src={fullSrc}
                    alt={name || 'Avatar'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={() => setImgError(true)}
                />
            </div>
        );
    }

    return (
        <div style={style} className={className}>
            {initials || <FiUser size={size * 0.44} color="#fff" />}
        </div>
    );
}
