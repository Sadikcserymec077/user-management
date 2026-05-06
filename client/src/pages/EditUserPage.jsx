import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';
import { getUserById, updateUser } from '../services/userService';
import UserForm from '../components/UserForm';
import Loader from '../components/Loader';

export default function EditUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        let active = true;
        const fetchUser = async () => {
            try {
                const res = await getUserById(id);
                if (active) setInitialData(res.data.data);
            } catch (error) {
                toast.error(error.message);
                navigate('/');
            } finally {
                if (active) setLoading(false);
            }
        };
        fetchUser();
        return () => { active = false; };
    }, [id, navigate]);

    const handleSubmit = async (formData) => {
        try {
            setSubmitting(true);
            await updateUser(id, formData);
            toast.success('User updated successfully');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <Loader fullPage text="Loading user data..." />;
    }

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
                    Edit User
                </h1>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    Update the account details for {initialData?.firstName} {initialData?.lastName}.
                </p>
            </div>

            {/* ─── Form Card ─────────────────────────────────────────── */}
            <div className="card">
                <UserForm
                    initialData={initialData}
                    onSubmit={handleSubmit}
                    loading={submitting}
                    submitLabel="Save Changes"
                />
            </div>
        </div>
    );
}
