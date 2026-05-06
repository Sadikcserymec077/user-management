import { Link } from 'react-router-dom';
import { FiEye, FiEdit2, FiTrash2, FiMapPin, FiPhone } from 'react-icons/fi';
import ProfileAvatar from './ProfileAvatar';
import StatusBadge from './StatusBadge';
import EmptyState from './EmptyState';

// ─── Skeleton row ────────────────────────────────────────────────────────────
function SkeletonRow() {
    return (
        <tr>
            {[...Array(7)].map((_, i) => (
                <td key={i} className="px-4 py-3">
                    <div className="skeleton h-4 rounded" style={{ width: i === 0 ? '36px' : i === 1 ? '80%' : '60%', height: i === 0 ? '36px' : '14px', borderRadius: i === 0 ? '50%' : '6px' }} />
                </td>
            ))}
        </tr>
    );
}

export default function UserTable({ users, loading, onDelete }) {
    if (loading) {
        return (
            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            {['Avatar', 'Name', 'Email', 'Mobile', 'Location', 'Status', 'Actions'].map((h) => (
                                <th key={h}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
                    </tbody>
                </table>
            </div>
        );
    }

    if (!users || users.length === 0) {
        return <EmptyState description="No users match your criteria. Try a different search or add a new user." />;
    }

    return (
        <>
            {/* ─── Desktop Table ──────────────────────────────────────── */}
            <div className="table-wrapper hidden md:block">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="animate-fade-in">
                                <td>
                                    <ProfileAvatar
                                        src={user.profileImage}
                                        name={`${user.firstName} ${user.lastName}`}
                                        size={40}
                                    />
                                </td>
                                <td>
                                    <div className="font-semibold" style={{ color: 'var(--color-text)' }}>
                                        {user.firstName} {user.lastName}
                                    </div>
                                    <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                                        {user.gender}
                                    </div>
                                </td>
                                <td style={{ color: 'var(--color-text-muted)' }}>{user.email}</td>
                                <td style={{ color: 'var(--color-text-muted)' }}>{user.mobile}</td>
                                <td style={{ color: 'var(--color-text-muted)' }}>
                                    <span className="flex items-center gap-1">
                                        <FiMapPin size={12} />
                                        {user.location}
                                    </span>
                                </td>
                                <td>
                                    <StatusBadge status={user.status} />
                                </td>
                                <td>
                                    <div className="flex items-center justify-center gap-2">
                                        <Link
                                            to={`/view-user/${user._id}`}
                                            className="btn btn-ghost btn-icon"
                                            title="View"
                                            style={{ color: 'var(--color-accent)' }}
                                        >
                                            <FiEye size={15} />
                                        </Link>
                                        <Link
                                            to={`/edit-user/${user._id}`}
                                            className="btn btn-ghost btn-icon"
                                            title="Edit"
                                            style={{ color: 'var(--color-warning)' }}
                                        >
                                            <FiEdit2 size={15} />
                                        </Link>
                                        <button
                                            className="btn btn-ghost btn-icon"
                                            title="Delete"
                                            style={{ color: 'var(--color-danger)' }}
                                            onClick={() => onDelete(user)}
                                        >
                                            <FiTrash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ─── Mobile Card List ────────────────────────────────────── */}
            <div className="flex flex-col gap-3 md:hidden">
                {users.map((user) => (
                    <div key={user._id} className="card animate-fade-in" style={{ padding: '1rem' }}>
                        <div className="flex items-start gap-3">
                            <ProfileAvatar
                                src={user.profileImage}
                                name={`${user.firstName} ${user.lastName}`}
                                size={48}
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                    <span className="font-semibold text-sm">
                                        {user.firstName} {user.lastName}
                                    </span>
                                    <StatusBadge status={user.status} />
                                </div>
                                <p className="text-xs mt-1 truncate" style={{ color: 'var(--color-text-muted)' }}>
                                    {user.email}
                                </p>
                                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                        <FiPhone size={11} /> {user.mobile}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                        <FiMapPin size={11} /> {user.location}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Card actions */}
                        <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                            <Link to={`/view-user/${user._id}`} className="btn btn-ghost flex-1 text-xs" style={{ color: 'var(--color-accent)' }}>
                                <FiEye size={13} /> View
                            </Link>
                            <Link to={`/edit-user/${user._id}`} className="btn btn-ghost flex-1 text-xs" style={{ color: 'var(--color-warning)' }}>
                                <FiEdit2 size={13} /> Edit
                            </Link>
                            <button onClick={() => onDelete(user)} className="btn btn-ghost flex-1 text-xs" style={{ color: 'var(--color-danger)' }}>
                                <FiTrash2 size={13} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
