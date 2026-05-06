export default function Loader({ fullPage = false, size = 40, text = 'Loading...' }) {
    const spinner = (
        <div className="flex flex-col items-center justify-center gap-4">
            <div
                className="animate-spin-slow rounded-full border-4"
                style={{
                    width: size,
                    height: size,
                    borderColor: 'var(--color-border)',
                    borderTopColor: 'var(--color-primary)',
                }}
            />
            {text && (
                <p className="text-sm font-medium animate-pulse-soft" style={{ color: 'var(--color-text-muted)' }}>
                    {text}
                </p>
            )}
        </div>
    );

    if (fullPage) {
        return (
            <div
                className="fixed inset-0 flex items-center justify-center z-50"
                style={{ background: 'var(--color-bg)' }}
            >
                {spinner}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-16">
            {spinner}
        </div>
    );
}
