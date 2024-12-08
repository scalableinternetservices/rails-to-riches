// src/pages/RestaurantProfile.js
import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../AuthContext";
import {
  Container,
  Typography,
  Box,
  Chip,
  Link,
  Button,
  CircularProgress,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { useNavigate, useParams } from "react-router-dom";

import PhotoGallery from "../components/PhotoGallery";
import DishesList from "../components/DishesList";
import ReviewsList from "../components/ReviewsList";

import {
  getRestaurant,
  listReviews,
  listComments,
  listDishes,
  listPhotos,
} from "../services/api"; // Import API functions
import Review from "./Review";
import AddDishes from "../components/AddDishes";

function RestaurantProfile() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch restaurant details
      const restaurantResponse = await getRestaurant(id);
      setRestaurant(restaurantResponse.data);

      // Fetch dishes
      const dishesResponse = await listDishes(id);
      setDishes(dishesResponse.data);

      // Fetch photos
      const photosResponse = await listPhotos(id);
      setPhotos(photosResponse.data);

      const reviewsResponse = await listReviews(id);
      const reviewsWithComments = await Promise.all(
        reviewsResponse.data.map(async (review) => {
          const commentsResponse = await listComments(id, review.id);
          return {
            ...review,
            comments: commentsResponse.data,
          };
        })
      );
      setReviews(reviewsWithComments);
    } catch (err) {
      setError("Failed to load restaurant data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / reviews.length;
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  const averageRating = calculateAverageRating(reviews);
  const roundedAverageRating = Math.round(averageRating * 10) / 10;

  const EditButton = ({ restaurantId, userId, currentUserId }) => {
    const navigate = useNavigate();

    if (userId !== currentUserId) return null;

    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/restaurants/${restaurantId}/edit`)}
        sx={{ ml: 2 }}
      >
        Edit Restaurant
      </Button>
    );
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column" }}
    >
      {/* Restaurant Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {restaurant.name}
          </Typography>
          
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 2,
              mt: { xs: 1, sm: 0 },
            }}
          >
            <Rating
              name="average-rating"
              value={averageRating}
              precision={0.1}
              readOnly
              sx={{ color: "#FFD700", fontSize: "1.5rem" }}
            />
            <Typography variant="h6" sx={{ ml: 1 }}>
              {roundedAverageRating} ({reviews.length} review
              {reviews.length !== 1 ? "s" : ""})
            </Typography>
          </Box>
          <EditButton
            restaurantId={restaurant.id}
            userId={restaurant.user_id}
            currentUserId={user?.id}
          />
        </Box>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {restaurant.address}, {restaurant.city}, {restaurant.state}{" "}
          {restaurant.zip}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {restaurant.description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Chip
            label={`Phone: ${restaurant.phone_number}`}
            sx={{ mr: 1, mb: 1 }}
          />
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
        <PhotoGallery
          photos={photos}
          restaurantId={id}
          isOwner={restaurant?.user_id === user?.id}
          onPhotosUpdate={fetchData}
        />
      </Box>

      {/* Dishes List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Our Dishes
        </Typography>
        <DishesList dishes={dishes} />
        {restaurant?.user_id === user?.id && <AddDishes />}
      </Box>

      {/* Reviews List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Reviews
        </Typography>
        <ReviewsList reviews={reviews} fetchReviews={fetchData} />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Review handleFetchReviews={fetchData} />
      </Box>
    </Container>
  );
}

export default RestaurantProfile;
