import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Typography, Box, Button, Container } from "@mui/material";
import Restaurants from "../components/Restaurants";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box
        sx={{
          bgcolor: "background.default",
          p: 2,
          borderRadius: 2,
          boxShadow: 0,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          {user ? `Welcome, ${user.name}!` : "Welcome!"}
          {user.role === "business_owner" && (
            <Button
              color="secondary"
              component={Link}
              to="/createRestaurant"
              sx={{
                bgcolor: "primary.main",
                color: "error.contrastText",
                padding: 1,
                "&:hover": {
                  bgcolor: "error.dark",
                },
                position: "absolute",
                right: 0,
                marginRight: 3,
              }}
            >
              Create Restaurant
            </Button>
          )}
        </Typography>
        <Restaurants />
      </Box>
    </Container>
  );
}

export default Home;
