import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FiDownload } from 'react-icons/fi';
import { getUsers, searchUsers, deleteUser, exportUsersCSV } from '../services/userService';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/UserTable';
import Pagination from '../components/Pagination';
import ConfirmModal from '../components/ConfirmModal';

export default function UsersListPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Pagination state
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 8;

    // Delete modal state
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null, loading: false });

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            if (searchQuery.trim()) {
                const res = await searchUsers(searchQuery);
                setUsers(res.data.data);
                setTotalPages(1); // Search results aren't paginated in this implementation
            } else {
                const res = await getUsers(page, limit);
                setUsers(res.data.data);
                setTotalPages(res.data.totalPages);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [page, limit, searchQuery]);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1); // Reset to page 1 on new search
            fetchUsers();
        }, 400);
        return () => clearTimeout(timer);
    }, [searchQuery, fetchUsers]);

    const handleDelete = async () => {
        try {
            setDeleteModal((prev) => ({ ...prev, loading: true }));
            await deleteUser(deleteModal.user._id);
            toast.success('User deleted successfully');
            setDeleteModal({ isOpen: false, user: null, loading: false });

            // Refresh list, handling last item on page edge case
            if (users.length === 1 && page > 1) {
                setPage(page - 1);
            } else {
                fetchUsers();
            }
        } catch (error) {
            toast.error(error.message);
            setDeleteModal((prev) => ({ ...prev, loading: false }));
        }
    };

    const handleExportCSV = async () => {
        try {
            const res = await exportUsersCSV();
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `users_export_${new Date().toISOString().slice(0, 10)}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success('CSV exported successfully');
        } catch (error) {
            toast.error('Failed to export CSV. No data found.');
        }
    };

    return (
        <div className="page-wrapper animate-fade-in">
            {/* ─── Header Section ───────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                        User Management
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        Manage your team members and their account permissions here.
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex-1 min-w-[240px]">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    </div>
                    <button
                        onClick={handleExportCSV}
                        className="btn btn-ghost hidden sm:flex shrink-0"
                        title="Export to CSV"
                    >
                        <FiDownload size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {/* ─── Table Section ────────────────────────────────────── */}
            <div className="card p-0 overflow-hidden mb-6">
                <UserTable
                    users={users}
                    loading={loading}
                    onDelete={(user) => setDeleteModal({ isOpen: true, user, loading: false })}
                />
            </div>

            {/* ─── Pagination Section ───────────────────────────────── */}
            {!loading && !searchQuery && totalPages > 1 && (
                <div className="flex justify-center sm:justify-end mt-4">
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            )}

            {/* ─── Delete Confirmation Modal ───────────────────────── */}
            <ConfirmModal
                isOpen={deleteModal.isOpen}
                loading={deleteModal.loading}
                title="Delete User"
                message={`Are you sure you want to delete ${deleteModal.user?.firstName} ${deleteModal.user?.lastName}? This action cannot be undone.`}
                onClose={() => setDeleteModal({ isOpen: false, user: null, loading: false })}
                onConfirm={handleDelete}
            />
        </div>
    );
}
