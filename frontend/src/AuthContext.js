// src/AuthContext.js
import React, { createContext, useState } from "react";
import { setAuthToken } from "./services/api";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  // Helper function to safely parse JSON
  const safeJSONParse = (data) => {
    try {
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return null;
    }
  };

  // Initialize authTokens from localStorage if available
  const [authTokens, setAuthTokensState] = useState(() => {
    const tokens = localStorage.getItem("tokens");
    return safeJSONParse(tokens);
  });

  // Initialize user data from localStorage if available
  const [user, setUserState] = useState(() => {
    const userData = localStorage.getItem("user");
    return safeJSONParse(userData);
  });

  // Loading state to manage asynchronous operations (if needed)
  const [loading, setLoading] = useState(false);

  // Function to handle login and signup
  const setAuthTokens = (tokens, userData) => {
    if (tokens && userData) {
      setAuthTokensState(tokens);
      setUserState(userData);
      setAuthToken(tokens);
      localStorage.setItem("tokens", JSON.stringify(tokens));
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      console.error(
        "setAuthTokens was called with invalid tokens or userData:",
        tokens,
        userData
      );
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    setAuthTokensState(null);
    setUserState(null);
    setAuthToken(null);
    localStorage.removeItem("tokens");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        authTokens,
        setAuthTokens,
        user,
        loading,
        setLoading,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
