// src/pages/Home.js
import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Typography, Box, Container } from "@mui/material";
import Restaurants from "../components/Restaurants";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box
        sx={{
          bgcolor: "background.default",
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          {user ? `Welcome, ${user.name}!` : "Welcome!"}
        </Typography>
        <Typography variant="body1">
          <Restaurants />
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
