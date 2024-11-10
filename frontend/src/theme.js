// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2f6690', // Dark
      light: '#3a7ca5', // Medium
      dark: '#16425b', // Darkest
      contrastText: '#ffffff', // White text
    },
    secondary: {
      main: '#81c3d7', // Light
    },
    background: {
      default: '#d9dcd6', // Background
      paper: '#ffffff', // Paper components background
    },
    error: {
      main: '#d32f2f',
    },
    success: {
      main: '#388e3c',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
