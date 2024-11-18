// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { loginUser } from '../services/api';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

function Login() {
  const navigate = useNavigate();
  const { setAuthTokens } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple submissions

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset any existing errors

    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    // **Log the collected form data**
    console.log('Collected Login Data:', { email, password });

    // Prepare the payload
    const payload = { 
      email, 
      password 
    };

    // **Log the payload being sent to the backend**
    console.log('Payload Sent to Backend:', { user: payload });

    setIsSubmitting(true); // Disable the submit button

    try {
      const response = await loginUser(email, password);
      // **Log the response from the backend**
      console.log('Login Response:', response);

      if (response.status === 200) {
        setAuthTokens(response.data.jwt); // Store the JWT token
        navigate('/'); // Navigate to the home page
      } else {
        setError('Login failed');
      }
    } catch (error) {
      // **Log the error response from the backend**
      console.error('Login Error:', error);

      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          setError(error.response.data.errors.join(', '));
        } else if (error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError('Login failed');
        }
      } else {
        setError('Login failed');
      }
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary.dark">
            Sign in
          </Typography>
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* Email Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color="primary"
              variant="outlined"
            />
            {/* Password Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="primary"
              variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting} // Disable button while submitting
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2" sx={{ color: 'secondary.main' }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
