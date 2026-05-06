import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    withCredentials: true,
    timeout: 20000,
});

// ─── Response interceptor: normalise errors ─────────────────────────────────
API.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error?.response?.data?.message ||
            error?.response?.data?.errors?.[0]?.message ||
            error?.message ||
            'Something went wrong. Please try again.';
        return Promise.reject(new Error(message));
    }
);

export default API;
