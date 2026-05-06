import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiEdit2, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser } from 'react-icons/fi';
import { getUserById } from '../services/userService';
import Loader from '../components/Loader';
import ProfileAvatar from '../components/ProfileAvatar';
import StatusBadge from '../components/StatusBadge';

export default function ViewUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        const fetchUser = async () => {
            try {
                const res = await getUserById(id);
                if (active) setUser(res.data.data);
            } catch (error) {
                toast.error('User not found');
                navigate('/');
            } finally {
                if (active) setLoading(false);
            }
        };
        fetchUser();
        return () => { active = false; };
    }, [id, navigate]);

    if (loading) return <Loader fullPage text="Loading profile..." />;
    if (!user) return null;

    return (
        <div className="page-wrapper max-w-3xl animate-fade-in">
            {/* ─── Header ────────────────────────────────────────────── */}
            <div className="mb-6 flex items-center justify-between">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
                    style={{ color: 'var(--color-primary)' }}
                >
                    <FiArrowLeft size={16} /> Back to Users
                </Link>
                <Link to={`/edit-user/${user._id}`} className="btn btn-primary btn-sm">
                    <FiEdit2 size={14} /> Edit Profile
                </Link>
            </div>

            {/* ─── Profile Card ──────────────────────────────────────── */}
            <div className="card p-0 overflow-hidden relative">
                {/* Cover photo equivalent (gradient bar) */}
                <div className="h-32 w-full" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.2) 100%)' }} />

                <div className="px-6 md:px-10 pb-10">
                    {/* Avatar & Title container */}
                    <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-16 sm:-mt-14 mb-8">
                        <div className="rounded-full p-1.5" style={{ background: 'var(--color-surface)', display: 'inline-block' }}>
                            <ProfileAvatar
                                src={user.profileImage}
                                name={`${user.firstName} ${user.lastName}`}
                                size={120}
                            />
                        </div>
                        <div className="flex-1 pb-2">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div>
                                    <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                                        {user.firstName} {user.lastName}
                                    </h1>
                                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                                        {user.gender}
                                    </p>
                                </div>
                                <StatusBadge status={user.status} />
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <DetailItem icon={<FiMail />} label="Email Address" value={user.email} />
                        <DetailItem icon={<FiPhone />} label="Mobile Number" value={user.mobile} />
                        <DetailItem icon={<FiMapPin />} label="Location" value={user.location} />
                        <DetailItem icon={<FiUser />} label="Gender" value={user.gender} />
                        <DetailItem
                            icon={<FiCalendar />}
                            label="Joined Date"
                            value={new Date(user.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric',
                            })}
                        />
                        <DetailItem
                            icon={<FiCalendar />}
                            label="Last Updated"
                            value={new Date(user.updatedAt).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric',
                            })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-2xl glass transition-colors hover:bg-white/5">
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', boxShadow: '0 4px 10px rgba(99,102,241,0.2)' }}
            >
                {icon}
            </div>
            <div>
                <p className="text-xs font-medium mb-1 uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                    {label}
                </p>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                    {value || '—'}
                </p>
            </div>
        </div>
    );
}
