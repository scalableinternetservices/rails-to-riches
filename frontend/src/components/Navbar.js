// src/components/Navbar.js
import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import LogoutButton from './LogoutButton';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'primary.main' }}>
      <Link component={RouterLink} to="/" color="inherit" underline="none">
        Home
      </Link>
      {user ? (
        <>
          <Link component={RouterLink} to="/profile" color="inherit" underline="none" sx={{ mr: 2 }}>
            Profile
          </Link>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link component={RouterLink} to="/login" color="inherit" underline="none" sx={{ mr: 2 }}>
            Login
          </Link>
          <Link component={RouterLink} to="/signup" color="inherit" underline="none">
            Sign Up
          </Link>
        </>
      )}
    </Box>
  );
}

export default Navbar;
