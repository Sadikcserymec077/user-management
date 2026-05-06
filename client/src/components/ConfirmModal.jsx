import { FiAlertTriangle, FiX } from 'react-icons/fi';

export default function ConfirmModal({ isOpen, onClose, onConfirm, loading = false, title = 'Confirm Delete', message = 'Are you sure you want to delete this user? This action cannot be undone.' }) {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-box animate-fade-in" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ background: 'rgba(239, 68, 68, 0.15)' }}
                        >
                            <FiAlertTriangle size={22} color="var(--color-danger)" />
                        </div>
                        <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                            {title}
                        </h3>
                    </div>
                    <button className="btn btn-ghost btn-icon ml-3" onClick={onClose} aria-label="Close">
                        <FiX size={18} />
                    </button>
                </div>

                {/* Body */}
                <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {message}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                    <button className="btn btn-ghost" onClick={onClose} disabled={loading}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
                        {loading ? (
                            <>
                                <span
                                    className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin-slow"
                                />
                                Deleting…
                            </>
                        ) : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}
