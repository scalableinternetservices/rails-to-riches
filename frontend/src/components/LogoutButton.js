// src/components/LogoutButton.js
import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function LogoutButton() {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <Button variant="contained" color="secondary" onClick={logout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
