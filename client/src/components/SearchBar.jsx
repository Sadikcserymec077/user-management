import { useRef, useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ value, onChange, placeholder = 'Search by name, email, mobile…' }) {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);

    // keyboard shortcut: Ctrl+K / Cmd+K focuses search
    useEffect(() => {
        const handler = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    return (
        <div
            className="relative flex items-center transition-all duration-200"
            style={{
                background: 'var(--color-surface-2)',
                border: `1.5px solid ${focused ? 'var(--color-primary)' : 'var(--color-border)'}`,
                borderRadius: 12,
                boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.2)' : 'none',
                minWidth: 0,
            }}
        >
            <FiSearch
                size={16}
                className="absolute left-3.5 shrink-0"
                style={{ color: focused ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
            />
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm outline-none"
                style={{
                    color: 'var(--color-text)',
                    caretColor: 'var(--color-primary)',
                    paddingTop: '0.65rem',
                    paddingBottom: '0.65rem',
                    paddingLeft: '2.5rem',
                    paddingRight: '2.5rem'
                }}
                aria-label="Search users"
            />
            {value && (
                <button
                    className="absolute right-3 p-0.5 rounded-md transition-colors hover:bg-white/10"
                    onClick={() => onChange('')}
                    aria-label="Clear search"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                    <FiX size={14} />
                </button>
            )}
        </div>
    );
}
