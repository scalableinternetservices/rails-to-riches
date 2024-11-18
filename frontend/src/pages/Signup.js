import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { signupUser } from '../services/api';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem'; 
import FormControl from '@mui/material/FormControl'; 
import InputLabel from '@mui/material/InputLabel'; 
import Select from '@mui/material/Select';

function Signup() {
  const navigate = useNavigate();
  const { setAuthTokens } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const roles = [
    { value: 'business_owner', label: 'Business Owner' },
    { value: 'customer', label: 'Customer' },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const data = new FormData(event.currentTarget);

    const name = data.get('name');
    const email = data.get('email');
    const password = data.get('password');
    const passwordConfirmation = data.get('passwordConfirmation');
    const role = data.get('role');

    console.log('Collected Form Data:', {
      name,
      email,
      password,
      passwordConfirmation,
      role,
    });

    if (!name || !email || !password || !passwordConfirmation || !role) {
      setError("All fields are required");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    const payload = { 
      name, 
      email, 
      password, 
      password_confirmation: passwordConfirmation, 
      role 
    };

    console.log('Payload Sent to Backend:', { user: payload });

    setIsSubmitting(true); 
    try {
      const response = await signupUser(payload);
      console.log('Signup Response:', response);

      if (response.status === 201) {
        const tokens = response.data.jwt;
        const userData = response.data.user;
        setAuthTokens(tokens, userData); 
        navigate('/'); 
      } else {
        setError('Signup failed');
      }
    } catch (error) {
      console.error('Signup Error:', error);

      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          setError(error.response.data.errors.join(', '));
        } else if (error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError('Signup failed');
        }
      } else {
        setError('Signup failed');
      }
    } finally {
      setIsSubmitting(false); 
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary.dark">
            Sign Up
          </Typography>
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* Name Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              color="primary"
              variant="outlined"
            />
            {/* Email Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="new-password"
              color="primary"
              variant="outlined"
            />
            {/* Confirm Password Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="Confirm Password"
              type="password"
              id="passwordConfirmation"
              autoComplete="new-password"
              color="primary"
              variant="outlined"
            />
            {/* Role Dropdown */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                label="Role"
                defaultValue="" // Ensure no default selection
              >
                {roles.map((roleOption) => (
                  <MenuItem key={roleOption.value} value={roleOption.value}>
                    {roleOption.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting} // Disable button while submitting
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: 'secondary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                },
              }}
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2" sx={{ color: 'secondary.main' }}>
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
