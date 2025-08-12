import axios from 'axios';

// Use environment variable for cloud deployment, fallback to cloud backend for production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://catalyst-career-ai-backend.onrender.com';

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
  return config;
});

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
  // Auth endpoints - these are correct
  login: (email, password) =>
    safeRequest(
      httpClient.post('/auth/login', {
        email: email,
        password: password,
      })
    ),

  getCurrentUser: () => safeRequest(httpClient.get('/auth/me')),

  // Admin endpoints - these are correct
  getUsers: () => safeRequest(httpClient.get('/admin/users')),
  
  getActivity: (limit = 100) => safeRequest(httpClient.get(`/admin/activity?limit=${limit}`)),
  
  getUserSummary: (userId) => safeRequest(httpClient.get(`/admin/users/${userId}/summary`)),

  // System endpoints - these are correct
  getHealth: () => safeRequest(httpClient.get('/health')),
  
  getSystemStatus: () => safeRequest(httpClient.get('/system-status')),
  
  getApiStatus: () => safeRequest(axios.get(`${API_BASE_URL}/api/status`)),

  // Blog endpoints
  getBlogPosts: () => safeRequest(httpClient.get('/admin/blog-posts')),
  createBlogPost: (postData) => safeRequest(httpClient.post('/admin/blog-posts', postData)),
  updateBlogPost: (postId, postData) => safeRequest(httpClient.put(`/admin/blog-posts/${postId}`, postData)),
  deleteBlogPost: (postId) => safeRequest(httpClient.delete(`/admin/blog-posts/${postId}`)),
  getBlogPost: (postId) => safeRequest(httpClient.get(`/admin/blog-posts/${postId}`)),

  // Contact endpoints
  getContactSubmissions: () => safeRequest(httpClient.get('/admin/contact-submissions')),
  updateContactStatus: (submissionId, status) => safeRequest(httpClient.put(`/admin/contact-submissions/${submissionId}/status`, { status })),
  deleteContactSubmission: (submissionId) => safeRequest(httpClient.delete(`/admin/contact-submissions/${submissionId}`)),
  getContactSubmission: (submissionId) => safeRequest(httpClient.get(`/admin/contact-submissions/${submissionId}`)),
};

export default api;

