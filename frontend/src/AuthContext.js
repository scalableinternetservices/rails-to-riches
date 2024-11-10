// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { setAuthToken } from './services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokensState] = useState(() => {
    const token = JSON.parse(localStorage.getItem('tokens'));
    if (token) {
      setAuthToken(token);
    }
    return token;
  });

  const setAuthTokens = (data) => {
    if (data) {
      localStorage.setItem('tokens', JSON.stringify(data));
      setAuthToken(data);
      setAuthTokensState(data);
    } else {
      localStorage.removeItem('tokens');
      setAuthToken(null);
      setAuthTokensState(null);
    }
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens }}>
      {children}
    </AuthContext.Provider>
  );
};
