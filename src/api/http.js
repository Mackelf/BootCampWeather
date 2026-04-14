// src/api/http.js
import axios from 'axios';

const http = axios.create({
  timeout: 10000,
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[HTTP] Error', error);
    return Promise.reject(error);
  },
);

export default http;