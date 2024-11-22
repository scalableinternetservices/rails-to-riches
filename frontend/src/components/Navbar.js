// src/components/Navbar.js
import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { AppBar, Toolbar, Button, Box, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import NavbarLogo from './NavbarLogo';

function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        {/* Logo */}
        <NavbarLogo width={40} height={21} />

        {/* Spacer to push the Logout button to the far right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Logout Button */}
        <Tooltip title="Logout">
          <Button
            color="secondary"
            onClick={logout}
            sx={{
              bgcolor: 'primary.main',
              color: 'error.contrastText',
              minWidth: 'auto', 
              padding: 1, 
              '&:hover': {
                bgcolor: 'error.dark',
              },
            }}
          >
            <LogoutIcon />
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
