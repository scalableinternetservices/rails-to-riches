// src/services/api.js
import axios from 'axios';

// Base URL for your Rails backend
const BASE_URL = process.env.REACT_APP_RAILS_ENDPOINT || 'http://localhost:3000';

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Allows sending cookies and other credentials
  headers: {
    'Content-Type': 'application/json', // Sends data as JSON
    'Accept': 'application/json',       // Expects JSON responses
  },
});

// Function to set or remove the Authorization header
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Signup User
export const signupUser = (userData) => {
  return api.post('/api/signup', { user: userData });
};

// Login User
export const loginUser = (email, password) => {
  return api.post('/api/login', { user: { email, password } });
};

export const addreview = (rating, content, isAnonymous) => {
  return axios.post("/api/v1/reviews", {
    rating,
    content,
    isAnonymous,
  });
};

export default api;