import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    withCredentials: true,
    timeout: 60000, // Increased to 60 seconds for Render cold starts
});

// ─── Response interceptor: normalise errors & auto-retry ────────────────
API.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        // Ensure config exists
        if (!originalRequest) return Promise.reject(error);

        const isColdStartFail =
            error.code === 'ECONNABORTED' ||
            error.message?.includes('timeout') ||
            error.message === 'Network Error' ||
            (error.response && error.response.status >= 500);

        // Attempt exactly 1 retry if we suspect a cold start timeout
        if (isColdStartFail && !originalRequest._retry) {
            originalRequest._retry = true;

            toast.info('Server is waking up, please wait...', {
                toastId: 'server-waking',
                autoClose: 8000,
            });

            return API(originalRequest);
        }

        // Clean up direct timeout exceptions for the user frontend
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
            return Promise.reject(new Error('Backend server is starting, please wait a few seconds.'));
        }

        // Normal error extraction
        const message =
            error?.response?.data?.message ||
            error?.response?.data?.errors?.[0]?.message ||
            error?.message ||
            'Something went wrong. Please try again.';

        return Promise.reject(new Error(message));
    }
);

export default API;
