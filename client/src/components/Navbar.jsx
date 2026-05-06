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
                <Link to="/" className="flex items-center gap-3 group">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-base shadow-lg"
                        style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
                    >
                        U
                    </div>
                    <span className="text-lg font-bold gradient-text hidden sm:block">UserDash</span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                ${pathname === link.to
                                    ? 'text-white shadow-md'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            style={
                                pathname === link.to
                                    ? { background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', boxShadow: '0 4px 14px rgba(99,102,241,0.4)' }
                                    : {}
                            }
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
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                ${pathname === link.to ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            style={
                                pathname === link.to
                                    ? { background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }
                                    : {}
                            }
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
