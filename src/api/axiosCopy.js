import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
<<<<<<< HEAD
    const token = localStorage.getItem('userToken'); //role
    //set and get token in local storage for messages
=======
    const token = localStorage.getItem('userToken');
>>>>>>> 967d27c811f74b25ccf07e3783fdb6e0bd358107
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
