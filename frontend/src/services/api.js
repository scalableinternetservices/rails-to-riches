import axios from 'axios';

export const loginUser = async (email, password) => {
  return axios.post('/api/v1/login', {
    email,
    password,
  });
};

