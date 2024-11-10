// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2f6690',
      light: '#3a7ca5',
      dark: '#16425b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#81c3d7',
    },
    background: {
      default: '#d9dcd6',
    },
  },
});

export default theme;
