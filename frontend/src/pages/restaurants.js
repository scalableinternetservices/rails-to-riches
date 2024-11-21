// src/pages/Restaurants.js
import React, { useState, useEffect } from 'react';
import { Container, TextField, Box, Typography, Grid, Paper, Card, CardContent } from '@mui/material';
import axios from 'axios';

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch all restaurants from the backend
    axios.get('/api/restaurants')
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error('Error fetching restaurants:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h4" color="primary.dark" gutterBottom>
            Restaurants
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Search for a restaurant..."
            value={searchQuery}
            onChange={handleSearch}
            sx={{ mb: 3 }}
          />
          <Grid container spacing={2}>
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" color="primary.main">
                        {restaurant.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {restaurant.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {restaurant.address}, {restaurant.city}, {restaurant.state}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Phone: {restaurant.phone_number}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                No restaurants found.
              </Typography>
            )}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default Restaurants;
