// src/lib/api-client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token logic here if needed
        const token = localStorage.getItem('refreshToken');
        if (token) {
          // Implement refresh token logic
          // const response = await refreshToken(token);
          // localStorage.setItem('token', response.data.token);
          // originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          // return apiClient(originalRequest);
        }
      } catch (error) {
        // Handle refresh token error
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/sign-in';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;