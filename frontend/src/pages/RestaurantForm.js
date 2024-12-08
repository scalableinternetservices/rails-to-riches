import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  createRestaurant,
  updateRestaurant,
  createPhoto,
  getRestaurant,
} from "../services/api";

export default function RestaurantForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

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

  useEffect(() => {
    if (isEditMode) {
      // Fetch restaurant data if in edit mode
      const fetchRestaurantData = async () => {
        try {
          const response = await getRestaurant(id);
          const restaurant = response.data;
          setFormData({
            name: restaurant.name,
            description: restaurant.description,
            phone: restaurant.phone_number,
            address: restaurant.address,
            city: restaurant.city,
            state: restaurant.state,
            zip: restaurant.zip,
            website: restaurant.website || "",
            photo: null,
          });
        } catch (err) {
          setError("Failed to fetch restaurant data");
          console.error(err);
        }
      };
      fetchRestaurantData();
    }
  }, [id, isEditMode]);

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
      const restaurantData = {
        name: formData.name,
        description: formData.description,
        phone_number: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        website: formData.website,
      };

      let restaurantId;
      if (isEditMode) {
        await updateRestaurant(id, restaurantData);
        restaurantId = id;
        setSuccessMessage("Restaurant updated successfully!");
      } else {
        const response = await createRestaurant(restaurantData);
        restaurantId = response.data.id;
        setSuccessMessage("Restaurant created successfully!");
      }

      // Upload the primary photo if selected
      if (formData.photo) {
        const formDataPhoto = new FormData();
        formDataPhoto.append("photo[image]", formData.photo);
        formDataPhoto.append("photo[primary]", true);
        await createPhoto(restaurantId, formDataPhoto);
      }

      // Navigate back to restaurant profile after short delay
      setTimeout(() => {
        navigate(`/restaurants/${restaurantId}`);
      }, 1500);
    } catch (err) {
      setError(
        `Failed to ${
          isEditMode ? "update" : "create"
        } restaurant. Please try again.`
      );
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
          {isEditMode ? "Edit Restaurant" : "Create Restaurant"}
        </Typography>
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
        {successMessage && (
          <Typography color="success.main" variant="body2" gutterBottom>
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
                {loading ? "Submitting..." : isEditMode ? "Update" : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
