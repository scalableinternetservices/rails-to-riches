// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const token = localStorage.getItem('authTokens');
    return token ? JSON.parse(token) : null;
  });

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('authTokens');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return { id: payload.user_id };
    }
    return null;
  });

  const setTokens = (data) => {
    setAuthTokens(data);
    localStorage.setItem('authTokens', JSON.stringify(data));
    const payload = JSON.parse(atob(data.split('.')[1]));
    setUser({ id: payload.user_id });
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
