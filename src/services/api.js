import axios from 'axios';

// Use environment variable for cloud deployment, fallback to localhost for development
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
};

export default api;

