import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { listRestaurants, fetchPrimaryPhoto } from "../services/api";

function Restaurants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await listRestaurants();
        const restaurantsWithPhotos = await Promise.all(
          response.data.map(async (restaurant) => {
            try {
              const photoResponse = await fetchPrimaryPhoto(restaurant.id);
              return {
                ...restaurant,
                image_url: photoResponse.data.image_url || null,
              };
            } catch (error) {
              console.error(
                `Error fetching primary photo for restaurant ${restaurant.id}:`,
                error
              );
              return {
                ...restaurant,
                image_url: null,
              };
            }
          })
        );
        setRestaurants(restaurantsWithPhotos);
        setFilteredRestaurants(restaurantsWithPhotos);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
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
          sx={{ maxWidth: "500px" }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredRestaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
            <Link
              to={`/restaurants/${restaurant.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    restaurant.image_url ||
                    "https://via.placeholder.com/300x140?text=" +
                      restaurant.name.replaceAll(" ", "+")
                  }
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
                  <Box display="flex" alignItems="center" mt={1}>
                    <Rating
                      value={restaurant.average_rating || 0}
                      precision={0.1}
                      readOnly
                    />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({restaurant.total_reviews || 0} reviews)
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Restaurants;
