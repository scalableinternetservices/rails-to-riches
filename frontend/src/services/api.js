// src/services/api.js
import axios from "axios";

// Create an Axios instance with default configurations
const api = axios.create({
  withCredentials: true, // Allows sending cookies and other credentials
  headers: {
    "Content-Type": "application/json", // Sends data as JSON
    Accept: "application/json", // Expects JSON responses
  },
});

if (process.env.REACT_APP_RAILS_ENDPOINT) {
  api.defaults.baseURL = process.env.REACT_APP_RAILS_ENDPOINT;
}
api.defaults.baseURL = "http://rails-to-riches-v1.eba-viwn7vp8.us-west-2.elasticbeanstalk.com"

// Function to set or remove the Authorization header
export const setAuthToken = (token) => {
  if (token) {
    console.log("Setting auth header");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    console.log("Removing auth header");
    delete api.defaults.headers.common["Authorization"];
  }
};

// Function to initialize auth token from localStorage
export const initializeAuthToken = () => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  if (tokens) {
    setAuthToken(tokens);
  }
};

// Signup User
export const signupUser = (userData) => {
  return api.post("/api/signup", { user: userData });
};

// Login User
export const loginUser = (email, password) => {
  return api.post("/api/login", { user: { email, password } });
};

// Get Current User
export const getCurrentUser = () => {
  return api.get("/api/me");
};

// List Users
export const listUsers = () => {
  return api.get("/api/users");
};

// Get User
export const getUser = (id) => {
  return api.get(`/api/users/${id}`);
};

// Update User
export const updateUser = (id, userData) => {
  return api.put(`/api/users/${id}`, { user: userData });
};

// Delete User
export const deleteUser = (id) => {
  return api.delete(`/api/users/${id}`);
};

// List Restaurants
export const listRestaurants = () => {
  return api.get("/api/restaurants");
};

// Create Restaurant
export const createRestaurant = (restaurantData) => {
  return api.post("/api/restaurants", { restaurant: restaurantData });
};

// Get Restaurant
export const getRestaurant = (id) => {
  return api.get(`/api/restaurants/${id}`);
};

// Update Restaurant
export const updateRestaurant = (id, restaurantData) => {
  return api.put(`/api/restaurants/${id}`, { restaurant: restaurantData });
};

// Delete Restaurant
export const deleteRestaurant = (id) => {
  return api.delete(`/api/restaurants/${id}`);
};

// List Dishes
export const listDishes = (restaurantId) => {
  return api.get(`/api/restaurants/${restaurantId}/dishes`);
};

// Create Dish
export const createDish = (restaurantId, dishData) => {
  return api.post(`/api/restaurants/${restaurantId}/dishes`, {
    dish: dishData,
  });
};

// Get Dish
export const getDish = (id) => {
  return api.get(`/api/dishes/${id}`);
};

// Update Dish
export const updateDish = (id, dishData) => {
  return api.put(`/api/dishes/${id}`, { dish: dishData });
};

// Delete Dish
export const deleteDish = (id) => {
  return api.delete(`/api/dishes/${id}`);
};

// List Reviews
export const listReviews = (restaurantId) => {
  return api.get(`/api/restaurants/${restaurantId}/reviews`);
};

// Create Review
export const createReview = (restaurantId, reviewData) => {
  return api.post(`/api/restaurants/${restaurantId}/reviews`, {
    review: reviewData,
  });
};

// Get Review
export const getReview = (id) => {
  return api.get(`/api/reviews/${id}`);
};

// Update Review
export const updateReview = (id, reviewData) => {
  return api.put(`/api/reviews/${id}`, { review: reviewData });
};

// Delete Review
export const deleteReview = (id) => {
  return api.delete(`/api/reviews/${id}`);
};

// List Comments
export const listComments = (restaurantId, reviewId) => {
  return api.get(
    `/api/restaurants/${restaurantId}/reviews/${reviewId}/comments`
  );
};

// Create Comment
export const createComment = (restaurantId, reviewId, commentData) => {
  return api.post(
    `/api/restaurants/${restaurantId}/reviews/${reviewId}/comments`,
    { comment: commentData }
  );
};

// Get Comment
export const getComment = (id) => {
  return api.get(`/api/comments/${id}`);
};

// Update Comment
export const updateComment = (id, commentData) => {
  return api.put(`/api/comments/${id}`, { comment: commentData });
};

// Delete Comment
export const deleteComment = (id) => {
  return api.delete(`/api/comments/${id}`);
};

// Primary photo
export const fetchPrimaryPhoto = async (restaurantId) => {
  return api.get(`/api/restaurants/${restaurantId}/primary_photo`);
};

// List Photos
export const listPhotos = (restaurantId) => {
  return api.get(`/api/restaurants/${restaurantId}/photos`);
};

// Create Photo
export const createPhoto = (restaurantId, photoData) => {
  return api.post(`/api/restaurants/${restaurantId}/photos`, photoData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Get Photo
export const getPhoto = (id) => {
  return api.get(`/api/photos/${id}`);
};

// Update Photo
export const updatePhoto = (id, photoData) => {
  return api.put(`/api/photos/${id}`, photoData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete Photo
export const deletePhoto = (id) => {
  return api.delete(`/api/photos/${id}`);
};

export default api; // src/services/api.js
