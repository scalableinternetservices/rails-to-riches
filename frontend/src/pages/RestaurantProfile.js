// src/pages/RestaurantProfile.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { mockRestaurant } from '../data/mockData';

import { Container, Typography, Box, Grid, Chip, Link } from '@mui/material';

import PhotoGallery from '../components/PhotoGallery';
import DishesList from '../components/DishesList';
import ReviewsList from '../components/ReviewsList';
import Rating from '@mui/material/Rating'; // Import Rating component

function RestaurantProfile() {
  const { id } = useParams();

  // For now, using mock data
  const restaurant = mockRestaurant; // Replace with fetched data

  // Calculate average rating
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / reviews.length;
  };

  const averageRating = calculateAverageRating(restaurant.reviews);
  const roundedAverageRating = Math.round(averageRating * 10) / 10; // Round to one decimal

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Restaurant Header */}
      <Box sx={{ mb: 4 }}>
        {/* Parent Box with Flex Layout */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {restaurant.name}
          </Typography>
          {/* Average Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, mt: { xs: 1, sm: 0 } }}>
            <Rating
              name="average-rating"
              value={averageRating}
              precision={0.1}
              readOnly
              sx={{ color: '#FFD700', fontSize: '1.5rem' }} // Gold color and larger stars
            />
            <Typography variant="h6" sx={{ ml: 1 }}>
              {roundedAverageRating} ({restaurant.reviews.length} review{restaurant.reviews.length !== 1 ? 's' : ''})
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {restaurant.address}, {restaurant.city}, {restaurant.state} {restaurant.zip}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {restaurant.description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Chip label={`Phone: ${restaurant.phone_number}`} sx={{ mr: 1, mb: 1 }} />
          <Chip
            label={
              <Link href={restaurant.website} target="_blank" rel="noopener">
                Website
              </Link>
            }
            sx={{ mr: 1, mb: 1 }}
          />
        </Box>
      </Box>

      {/* Photo Gallery */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Photo Gallery
        </Typography>
        <PhotoGallery photos={restaurant.photos} />
      </Box>

      {/* Dishes List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Our Dishes
        </Typography>
        <DishesList dishes={restaurant.dishes} />
      </Box>

      {/* Reviews List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Reviews
        </Typography>
        <ReviewsList reviews={restaurant.reviews} />
      </Box>
    </Container>
  );
}

export default RestaurantProfile;
