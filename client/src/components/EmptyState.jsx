import { FiUsers } from 'react-icons/fi';

export default function EmptyState({ title = 'No Users Found', description = 'Get started by adding your first user.', action = null }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-5 animate-fade-in">
            {/* Icon ring */}
            <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center"
                style={{ background: 'rgba(99, 102, 241, 0.1)', border: '2px dashed rgba(99, 102, 241, 0.3)' }}
            >
                <FiUsers size={40} style={{ color: 'var(--color-primary)' }} />
            </div>

            {/* Text */}
            <div className="text-center max-w-xs">
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                    {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {description}
                </p>
            </div>

            {/* Optional CTA */}
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}
