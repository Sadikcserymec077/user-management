import API from './api';

const BASE = '/users';

// ─── Get all users (paginated) ───────────────────────────────────────────────
export const getUsers = (page = 1, limit = 8) =>
    API.get(`${BASE}?page=${page}&limit=${limit}`);

// ─── Search users ─────────────────────────────────────────────────────────────
export const searchUsers = (query) =>
    API.get(`${BASE}/search?query=${encodeURIComponent(query)}`);

// ─── Get single user by ID ───────────────────────────────────────────────────
export const getUserById = (id) => API.get(`${BASE}/${id}`);

// ─── Create user (with optional FormData for image) ──────────────────────────
export const createUser = (formData) =>
    API.post(BASE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

// ─── Update user ─────────────────────────────────────────────────────────────
export const updateUser = (id, formData) =>
    API.put(`${BASE}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

// ─── Delete user ─────────────────────────────────────────────────────────────
export const deleteUser = (id) => API.delete(`${BASE}/${id}`);

// ─── Export CSV ───────────────────────────────────────────────────────────────
export const exportUsersCSV = () =>
    API.get(`${BASE}/export/csv`, { responseType: 'blob' });
