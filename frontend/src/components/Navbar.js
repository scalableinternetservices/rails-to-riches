// src/components/Navbar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Navbar() {
  const { authTokens, setAuthTokens } = useContext(AuthContext);

  const handleLogout = () => {
    setAuthTokens(null);
    localStorage.removeItem('tokens');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.dark' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button component={RouterLink} to="/" color="inherit">
            RAILS ON RICHES
          </Button>
        </Typography>
        {authTokens ? (
          <Box>
            <Button component={RouterLink} to="/profile" color="inherit">
              Profile
            </Button>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button component={RouterLink} to="/login" color="inherit">
              Login
            </Button>
            <Button component={RouterLink} to="/signup" color="inherit">
              Signup
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
