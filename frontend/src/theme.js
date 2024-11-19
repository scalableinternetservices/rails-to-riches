// src/theme.js
import { createTheme } from '@mui/material/styles';

// Define your custom color palette and typography
const theme = createTheme({
  palette: {
    background: {
      default: '#E2E9F3', // Global Background Color
    },
    primary: {
      main: '#2F5972', // Buttons / Navbar Color
      contrastText: '#FFB500', // Button Text Color
    },
    secondary: {
      main: '#829995', // Headlines / Page Headers / Subheaders
      contrastText: '#1C2B36', // Normal Texts (used as contrast)
    },
    error: {
      main: '#662B23', // Warnings / Forbidden Actions
      contrastText: '#FFB500', // Button text color for errors
    },
    text: {
      primary: '#1C2B36', // Normal Texts
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial',
    // Customize typography variants with Montserrat
    h1: {
      color: '#829995',
      fontWeight: 700,
    },
    h2: {
      color: '#829995',
      fontWeight: 500,
    },
    h3: {
      color: '#829995',
      fontWeight: 500,
    },
    h4: {
      color: '#829995',
      fontWeight: 500,
    },
    h5: {
      color: '#829995',
      fontWeight: 500,
    },
    h6: {
      color: '#829995',
      fontWeight: 500,
    },
    subtitle1: {
      color: '#829995',
      fontWeight: 500,
    },
    subtitle2: {
      color: '#829995',
      fontWeight: 500,
    },
    body1: {
      color: '#1C2B36',
      fontWeight: 400,
    },
    body2: {
      color: '#1C2B36',
      fontWeight: 400,
    },
  },
});

export default theme;
