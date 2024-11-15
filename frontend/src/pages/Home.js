// src/pages/Home.js
import React from "react";
import { Container, Typography } from "@mui/material";
import SearchBar from "./SearchBar";

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" color="primary.main" sx={{ mt: 4 }}>
        Welcome to the Home Page
      </Typography>
      <SearchBar />
    </Container>
  );
};

export default Home;
