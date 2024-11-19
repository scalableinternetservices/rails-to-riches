// src/components/Logo.js
import React from 'react';
import { Box } from '@mui/material';

function NavbarLogo({ width = 50, height = 50 }) {
  return (
    <Box
      component="img"
      src="https://i.hizliresim.com/osre0t5.jpg"
      alt="navbarlogo"
      sx={{
        width: width,
        height: height,
        objectFit: 'contain',
      }}
    />
  );
}

export default NavbarLogo;
