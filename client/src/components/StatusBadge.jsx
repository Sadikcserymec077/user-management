const STATUS_CONFIG = {
    Active: {
        label: 'Active',
        bg: 'rgba(16, 185, 129, 0.12)',
        color: '#10b981',
        dot: '#10b981',
    },
    Inactive: {
        label: 'Inactive',
        bg: 'rgba(239, 68, 68, 0.12)',
        color: '#ef4444',
        dot: '#ef4444',
    },
};

export default function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] || {
        label: status || 'Unknown',
        bg: 'rgba(156, 163, 175, 0.12)',
        color: '#9ca3af',
        dot: '#9ca3af',
    };

    return (
        <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: config.bg, color: config.color }}
        >
            <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: config.dot }}
            />
            {config.label}
        </span>
    );
}
