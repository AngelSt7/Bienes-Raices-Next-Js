import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

if (typeof window === 'undefined') {
  api.defaults.headers.common['Origin'] = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
}

export default api;