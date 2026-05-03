import axios from 'axios';

const API_BASE = '/api';

const axiosInstance = axios.create({
  baseURL: API_BASE,
});

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => axiosInstance.post('/auth/signup', data),
  login: (data) => axiosInstance.post('/auth/login', data),
  getMe: () => axiosInstance.get('/auth/me'),
  getAllUsers: () => axiosInstance.get('/auth/users'),
};

export const projectAPI = {
  getAll: () => axiosInstance.get('/projects'),
  getById: (id) => axiosInstance.get(`/projects/${id}`),
  create: (data) => axiosInstance.post('/projects', data),
  update: (id, data) => axiosInstance.patch(`/projects/${id}`, data),
  delete: (id) => axiosInstance.delete(`/projects/${id}`),
  addMember: (id, memberId) => axiosInstance.post(`/projects/${id}/add-member`, { memberId }),
};

export const taskAPI = {
  getAll: (filters = {}) => axiosInstance.get('/tasks', { params: filters }),
  getById: (id) => axiosInstance.get(`/tasks/${id}`),
  create: (data) => axiosInstance.post('/tasks', data),
  update: (id, data) => axiosInstance.patch(`/tasks/${id}`, data),
  delete: (id) => axiosInstance.delete(`/tasks/${id}`),
};

export default axiosInstance;
