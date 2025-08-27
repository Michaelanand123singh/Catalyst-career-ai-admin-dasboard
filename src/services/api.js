import axios from 'axios';

// Determine the correct API base URL based on environment
const getApiBaseUrl = () => {
  // Prefer environment variable
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Development mode fallback
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:8000';
  }

  // If env var is missing in production, throw an error instead of silently falling back
  throw new Error('❌ Missing VITE_API_BASE_URL. Please set it in your .env.production');
};

const API_BASE_URL = getApiBaseUrl();

// Debug logging to help identify the issue
console.log('🔧 API Configuration Debug:');
console.log('Environment:', import.meta.env.MODE);
console.log('Hostname:', window.location.hostname);
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('Final API_BASE_URL:', API_BASE_URL);
console.log('Full API URL:', `${API_BASE_URL}/api`);

export const httpClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Add response interceptor for debugging
httpClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.config?.url, error.message);
    return Promise.reject(error);
  }
);

const safeRequest = async (promise) => {
  try {
    const response = await promise;
    return [response.data, null];
  } catch (error) {
    const message = error?.response?.data?.detail || error?.message || 'Request failed';
    return [null, { message, status: error?.response?.status }];
  }
};

const api = {
  // Auth endpoints
  login: (email, password) =>
    safeRequest(httpClient.post('/auth/login', { email, password })),
  getCurrentUser: () => safeRequest(httpClient.get('/auth/me')),

  // Admin endpoints
  getUsers: () => safeRequest(httpClient.get('/admin/users')),
  getActivity: (limit = 100) => safeRequest(httpClient.get(`/admin/activity?limit=${limit}`)),
  getUserSummary: (userId) => safeRequest(httpClient.get(`/admin/users/${userId}/summary`)),

  // System endpoints
  getHealth: () => safeRequest(httpClient.get('/health')),
  getSystemStatus: () => safeRequest(httpClient.get('/system-status')),
  getApiStatus: () => safeRequest(axios.get(`${API_BASE_URL}/api/status`)),

  // Blog endpoints
  getBlogPosts: () => safeRequest(httpClient.get('/admin/blog-posts')),
  createBlogPost: (postData) => safeRequest(httpClient.post('/admin/blog-posts', postData)),
  updateBlogPost: (postId, postData) => safeRequest(httpClient.put(`/admin/blog-posts/${postId}`, postData)),
  deleteBlogPost: (postId) => safeRequest(httpClient.delete(`/admin/blog-posts/${postId}`)),
  getBlogPost: (postId) => safeRequest(httpClient.get(`/admin/blog-posts/${postId}`)),

  // Image upload endpoint
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return safeRequest(
      httpClient.post('/admin/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );
  },

  // Contact endpoints
  getContactSubmissions: () => safeRequest(httpClient.get('/admin/contact-submissions')),
  updateContactStatus: (submissionId, status) =>
    safeRequest(httpClient.put(`/admin/contact-submissions/${submissionId}/status`, { status })),
  deleteContactSubmission: (submissionId) => safeRequest(httpClient.delete(`/admin/contact-submissions/${submissionId}`)),
  getContactSubmission: (submissionId) => safeRequest(httpClient.get(`/admin/contact-submissions/${submissionId}`)),
};

export default api;
