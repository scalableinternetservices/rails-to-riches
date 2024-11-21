// src/pages/Signup.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { signupUser } from "../services/api";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem"; // Import MenuItem for dropdown
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Logo from "../components/Logo"; // Import the Logo component
import BasicDialog from "../components/BasicDialog";

function Signup() {
  const navigate = useNavigate();
  const { setAuthTokens } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple submissions

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);

  // Define the roles array
  const roles = [
    { value: "business_owner", label: "Business Owner" },
    { value: "customer", label: "Customer" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset any existing errors

    const data = new FormData(event.currentTarget);

    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const passwordConfirmation = data.get("passwordConfirmation");
    const role = data.get("role"); // Retrieve the selected role

    // **Log the collected form data**
    console.log("Collected Form Data:", {
      name,
      email,
      password,
      passwordConfirmation,
      role,
    });

    // **Password Validation: Minimum 8 characters and at least one letter**
    const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include at least one letter."
      );
      setOpenDialog(true); // Open the error dialog
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      setOpenDialog(true); // Open the error dialog
      return;
    }

    // Prepare the payload
    const payload = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      role,
    };

    // **Log the payload being sent to the backend**
    console.log("Payload Sent to Backend:", { user: payload });

    setIsSubmitting(true); // Disable the submit button

    try {
      const response = await signupUser(payload);
      // **Log the response from the backend**
      console.log("Signup Response:", response);

      if (response.status === 201) {
        const tokens = response.data.jwt;
        const userData = response.data.user;
        setAuthTokens(tokens, userData); // Set tokens and user data
        navigate("/"); // Navigate to home page
      } else {
        setError("You already have an account, or your connection is lost.");
        setOpenDialog(true); // Open the error dialog
      }
    } catch (error) {
      // **Log the error response from the backend**
      console.error("Signup Error:", error);
      setError("You already have an account, or your connection is lost.");
      setOpenDialog(true); // Open the error dialog
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError(null);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Logo width={100} height={100} />

          {/* Icon */}
          <Typography component="h1" variant="h5" color="primary.dark">
            Sign Up
          </Typography>

          {/* Error Dialog */}
          <BasicDialog title="Error" content={error} open={openDialog} handleClose={handleCloseDialog}/>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            <TextField
              select
              label="Role"
              name="role"
              required
              fullWidth
              variant="outlined"
              margin="normal"
              defaultValue="customer" // Sets 'Customer' as the default selected role
              color="primary"
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting} // Disable button while submitting
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "primary.main",
                color: "error.contrastText", // To match Button Text Color
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  component={RouterLink}
                  to="/login"
                  variant="body2"
                  sx={{ color: "secondary.main" }}
                >
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
