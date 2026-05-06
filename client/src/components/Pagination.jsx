import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const delta = 1;
        const range = [];
        const left = Math.max(2, currentPage - delta);
        const right = Math.min(totalPages - 1, currentPage + delta);

        range.push(1);
        if (left > 2) range.push('...');
        for (let i = left; i <= right; i++) range.push(i);
        if (right < totalPages - 1) range.push('...');
        if (totalPages > 1) range.push(totalPages);

        return range;
    };

    const btnBase =
        'min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-150 px-2';
    const activeStyle = {
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
        color: '#fff',
        boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
    };
    const inactiveStyle = {
        background: 'var(--color-surface-2)',
        color: 'var(--color-text-muted)',
        border: '1px solid var(--color-border)',
    };
    const disabledStyle = { opacity: 0.35, cursor: 'not-allowed' };

    return (
        <div className="flex items-center gap-1.5 flex-wrap">
            {/* Prev */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={btnBase}
                style={currentPage === 1 ? { ...inactiveStyle, ...disabledStyle } : inactiveStyle}
                aria-label="Previous page"
            >
                <FiChevronLeft size={16} />
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((page, idx) =>
                page === '...' ? (
                    <span
                        key={`ellipsis-${idx}`}
                        className={`${btnBase} cursor-default`}
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={btnBase}
                        style={currentPage === page ? activeStyle : inactiveStyle}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={btnBase}
                style={currentPage === totalPages ? { ...inactiveStyle, ...disabledStyle } : inactiveStyle}
                aria-label="Next page"
            >
                <FiChevronRight size={16} />
            </button>
        </div>
    );
}
