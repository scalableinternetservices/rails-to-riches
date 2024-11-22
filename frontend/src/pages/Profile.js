// src/pages/Profile.js
import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import {
  Typography,
  Grid2 as Grid,
  Box,
  Container,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import {
  Email as EmailIcon,
  Person as PersonIcon,
  Work as WorkIcon,
} from "@mui/icons-material";

const Profile = () => {
  const { user } = useContext(AuthContext);

  // Function to get initials from the user's name
  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
      : "";
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
              {getInitials(user.name)}
            </Avatar>
            <Typography variant="h5">Your Profile</Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <PersonIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" color="textSecondary">
                  Name
                </Typography>
              </Box>
              <Typography variant="body1">{user.name}</Typography>
            </Grid>
            <Grid xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <EmailIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" color="textSecondary">
                  Email
                </Typography>
              </Box>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
            <Grid xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <WorkIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" color="textSecondary">
                  Role
                </Typography>
              </Box>
              <Typography variant="body1">{user.role}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
