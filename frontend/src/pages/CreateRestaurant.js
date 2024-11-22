// src/pages/CreateRestaurant.js
import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography, Container } from "@mui/material";
import { createRestaurant, createPhoto } from "../services/api"; // Import API functions

export default function CreateRestaurant() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    website: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      // Create the restaurant
      const restaurantResponse = await createRestaurant({
        name: formData.name,
        description: formData.description,
        phone_number: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        website: formData.website,
      });

      const restaurantId = restaurantResponse.data.id;

      // Upload the primary photo
      if (formData.photo) {
        const formDataPhoto = new FormData();
        formDataPhoto.append("photo[image]", formData.photo);
        formDataPhoto.append("photo[primary]", true);

        await createPhoto(restaurantId, formDataPhoto);
      }

      setSuccessMessage("Restaurant created successfully!");
    } catch (err) {
      setError("Failed to create restaurant. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          bgcolor: "background.default",
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create Restaurant
        </Typography>
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
        {successMessage && (
          <Typography color="success" variant="body2" gutterBottom>
            {successMessage}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Restaurant Name"
                name="name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                fullWidth
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                required
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City"
                name="city"
                fullWidth
                required
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="State"
                name="state"
                fullWidth
                required
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="ZIP Code"
                name="zip"
                type="text"
                fullWidth
                required
                value={formData.zip}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Website (optional)"
                name="website"
                type="url"
                fullWidth
                value={formData.website}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth>
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {formData.photo && (
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  Selected: {formData.photo.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
