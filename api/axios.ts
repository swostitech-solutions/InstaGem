import axios from "axios";

// Create axios instance with base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
  withCredentials: true,
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - check if we had a token before
      const hadToken = !!localStorage.getItem("token");
      
      // Clear auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.clear();
      
      // Only reload if user was previously authenticated
      // This prevents reload loops on the login page
      if (hadToken) {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
