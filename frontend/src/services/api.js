// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_RAILS_ENDPOINT;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const signupUser = async (name, email, password, passwordConfirmation, role = 'user') => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      role,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Example of an authenticated request
export const fetchProtectedData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


