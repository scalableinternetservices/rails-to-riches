// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './AuthContext';
import CssBaseline from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>
);
