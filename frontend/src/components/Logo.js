// src/components/Logo.js
import React from 'react';
import { Box } from '@mui/material';

function Logo({ width = 50, height = 50 }) {
  return (
    <Box
      component="img"
      src="https://i.hizliresim.com/9qfhnpn.png"
      alt="Logo"
      sx={{
        width: width,
        height: height,
        objectFit: 'contain',
      }}
    />
  );
}

export default Logo;
