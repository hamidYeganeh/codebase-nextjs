import axios from "axios";

// Create a base API client
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases (401, 403, etc.)
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      console.error("Unauthorized access");
    }
    return Promise.reject(error);
  }
);
