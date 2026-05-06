import { useState } from 'react';
import { FiUser } from 'react-icons/fi';

const GRADIENT_COLORS = [
    ['#6366f1', '#8b5cf6'],
    ['#06b6d4', '#0284c7'],
    ['#10b981', '#059669'],
    ['#f59e0b', '#d97706'],
    ['#ec4899', '#db2777'],
];

function getGradient(name = '') {
    const index = (name.charCodeAt(0) || 0) % GRADIENT_COLORS.length;
    return GRADIENT_COLORS[index];
}

export default function ProfileAvatar({ src, name = '', size = 40, className = '' }) {
    const [imgError, setImgError] = useState(false);
    const initials = name
        ? name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
        : '';
    const [from, to] = getGradient(name);

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
        background: `linear-gradient(135deg, ${from}, ${to})`,
        border: '2px solid rgba(255,255,255,0.08)',
        flexShrink: 0,
    };

    // Resolve full image URL
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace('/api', '');
    const fullSrc = src ? `${baseUrl}/uploads/${src}` : null;

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
