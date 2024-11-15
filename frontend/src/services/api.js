// src/services/api.js
import axios from 'axios';

if (process.env.REACT_APP_RAILS_ENDPOINT) {
  axios.defaults.baseURL = process.env.REACT_APP_RAILS_ENDPOINT;
}

export const loginUser = (email, password) => {
  return axios.post('/api/v1/login', {
    email,
    password,
  });
};

export const signupUser = (email, password) => {
  return axios.post('/api/v1/signup', {
    email,
    password,
  });
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
