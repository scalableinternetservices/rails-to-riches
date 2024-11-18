// src/pages/Home.js
import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Typography, Box, Container } from '@mui/material';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          bgcolor: 'background.default',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          {user ? `Welcome, ${user.name}!` : 'Welcome!'}
        </Typography>
        <Typography variant="body1">
          {user
            ? 'Thank you for logging in. Enjoy your stay!'
            : 'Please log in or sign up to continue.'}
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
