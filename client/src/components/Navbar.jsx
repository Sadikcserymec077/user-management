import { Link, useLocation } from 'react-router-dom';
import { FiUsers, FiUserPlus, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();

    const navLinks = [
        { to: '/', label: 'Dashboard', icon: <FiUsers size={16} /> },
        { to: '/add-user', label: 'Add User', icon: <FiUserPlus size={16} /> },
    ];

    return (
        <nav className="glass sticky top-0 z-40 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <div className="page-wrapper py-0 flex items-center justify-between h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-sm bg-indigo-600">
                        U
                    </div>
                    <span className="text-lg font-bold text-slate-100 hidden sm:block">User Management</span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                ${pathname === link.to
                                    ? 'bg-slate-700 text-white'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Hamburger */}
                <button
                    className="md:hidden btn btn-ghost btn-icon"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div
                    className="md:hidden border-t px-4 py-3 flex flex-col gap-2 animate-fade-in"
                    style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                ${pathname === link.to ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
