import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';
import { createUser } from '../services/userService';
import UserForm from '../components/UserForm';

export default function AddUserPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData) => {
        try {
            setLoading(true);
            await createUser(formData);
            toast.success('User created successfully');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper max-w-4xl animate-fade-in">
            {/* ─── Header ────────────────────────────────────────────── */}
            <div className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-medium mb-4 transition-colors hover:text-white"
                    style={{ color: 'var(--color-primary)' }}
                >
                    <FiArrowLeft size={16} /> Back to Users
                </Link>
                <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                    Add New User
                </h1>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    Fill in the information below to create a new user account.
                </p>
            </div>

            {/* ─── Form Card ─────────────────────────────────────────── */}
            <div className="card">
                <UserForm onSubmit={handleSubmit} loading={loading} submitLabel="Create User" />
            </div>
        </div>
    );
}
