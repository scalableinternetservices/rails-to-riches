// src/pages/Profile.js
import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Typography, Grid2 as Grid, Box, Container } from "@mui/material";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          bgcolor: "background.default",
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" mb={2}>
          Your Profile
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={1}>
            <Typography>Name:</Typography>
          </Grid>
          <Grid size={11}>
            <Typography>{user.name}</Typography>
          </Grid>
          <Grid size={1}>
            <Typography>Email:</Typography>
          </Grid>
          <Grid size={11}>
            <Typography>{user.email}</Typography>
          </Grid>
          <Grid size={1}>
            <Typography>Role:</Typography>
          </Grid>
          <Grid size={11}>
            <Typography>{user.role}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
