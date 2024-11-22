import React, { useState, useEffect } from 'react';
import { Box, TextField, Grid, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';
import { listRestaurants } from '../services/api'; // Import the listRestaurants API function

function Restaurants() {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    // Fetch the list of restaurants when the component mounts
    const fetchRestaurants = async () => {
      try {
        const response = await listRestaurants();
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRestaurants(
      restaurants.filter((restaurant) =>
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
                image={restaurant.image_url || 'https://via.placeholder.com/300x140?text='+restaurant.name.replaceAll(' ', '+')}
                alt={restaurant.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {restaurant.city}, {restaurant.state}
                </Typography>
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
