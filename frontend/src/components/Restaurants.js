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
  Pagination,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Link } from "react-router-dom";
import LinearProgressBar from "../components/LinearProgressBar";
import { listRestaurants, fetchPrimaryPhoto } from "../services/api";

function Restaurants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async (page, itemsPerPage) => {
    try {
      setLoading(true);
      const response = await listRestaurants(page, itemsPerPage);
      const restaurantsWithPhotos = await Promise.all(
        response.data.restaurants.map(async (restaurant) => {
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
      setTotalPages(response.data.total_pages);
      setTotalCount(response.data.total_count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants(currentPage, perPage);
  }, [currentPage, perPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(event.target.value);
    setCurrentPage(1); 
  }

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        {/* Centered Search Bar */}
        <Box display="flex" justifyContent="center" mb={3}>
          <TextField
            variant="outlined"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={handleSearch}
            size="medium"
            sx={{ width: { xs: "100%", sm: "500px" } }}
          />
        </Box>

        {/* Pagination and Per Page Controls */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={3}
          mb={2}
        >
          <Typography variant="body2" color="textSecondary">
            Total: {totalCount}
          </Typography>

          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="medium"
            showFirstButton
            showLastButton
          />
          
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" color="textSecondary">
              Show:
            </Typography>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={perPage}
                onChange={handlePerPageChange}
                variant="outlined"
              >
                {[10, 20, 30, 40, 50].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Loading Progress Bar */}
        <LinearProgressBar show={loading} />

        {/* Restaurant Cards Grid */}
        <Grid container spacing={3} mt={1}>
          {restaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
              <Link
                to={`/restaurants/${restaurant.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      restaurant.image_url ||
                      "https://via.placeholder.com/300x200?text=" +
                        restaurant.name.replaceAll(" ", "+")
                    }
                    alt={restaurant.name}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {restaurant.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      gutterBottom
                    >
                      {restaurant.city}, {restaurant.state}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 2 }}
                    >
                      {restaurant.description}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Rating
                        value={restaurant.average_rating || 0}
                        precision={0.1}
                        readOnly
                        size="small"
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
      </Box>
    </Container>
  );
}

export default Restaurants;
