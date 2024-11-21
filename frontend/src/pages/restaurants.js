import React, { useState, useEffect } from 'react';
import { Box, TextField, Grid, Card, CardMedia, CardContent, Typography, Rating, Container } from '@mui/material';
import mockRestaurants from '../mockRestaurants.json'; // Adjust the path if necessary

function Restaurants() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRestaurants(
      mockRestaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query)
      )
    );
  };

  return (
    <Container maxWidth="lg">
      <Box my={4} display="flex" justifyContent="center">
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search restaurants..."
          value={searchQuery}
          onChange={handleSearch}
          sx={{ maxWidth: '500px' }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredRestaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={restaurant.image_url || 'https://via.placeholder.com/300x140'}
                alt={restaurant.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {restaurant.city}, {restaurant.state}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <Rating value={restaurant.rating || 0} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({restaurant.reviews_count || 0} reviews)
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" mt={1}>
                  {restaurant.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Restaurants;
