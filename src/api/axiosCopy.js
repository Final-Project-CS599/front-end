import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors, e.g., redirect on 401
//     if (error.response?.status === 401) {
//       console.error('Unauthorized! Redirecting to login...');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );
