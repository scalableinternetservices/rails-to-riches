import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { createDish, updateDish } from "../services/api";
import { useParams } from "react-router-dom";

const AddDishes = ({ initialDish, isEditing, onCancel, onSuccess }) => {
  const { id } = useParams();
  const [showDishForm, setShowDishForm] = useState(isEditing || false);
  const [dish, setDish] = useState({
    name: initialDish?.name || "",
    description: initialDish?.description || "",
    price: initialDish?.price || "",
    id: initialDish?.id || null 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDish(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (dish.name && dish.description && dish.price) {
      try {
        if (isEditing) {
          const response = await updateDish(dish.id, dish);
          if (response.status === 200) {
            onSuccess?.();
          }
        } else {
          const response = await createDish(id, dish);
          if (response.status === 201) {
            onSuccess?.();
          }
        }
        handleCancel(); // Clear form after successful submission
      } catch (error) {
        console.error('Error saving dish:', error);
      }
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleCancel = () => {
    setShowDishForm(false);
    setDish({ name: "", description: "", price: "", id: null });
    onCancel?.();
  };

  return (
    <>
      {!showDishForm && !isEditing && (
        <Button
          color="secondary"
          onClick={() => setShowDishForm(true)}
          sx={{
            marginTop: 2,
            bgcolor: "primary.main",
            color: "error.contrastText",
            padding: 1,
            "&:hover": {
              bgcolor: "error.dark",
            },
          }}
        >
          Add Dish
        </Button>
      )}
      {(showDishForm || isEditing) && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Dish Name"
                name="name"
                value={dish.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Price"
                name="price"
                value={dish.price}
                onChange={handleInputChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Description"
                name="description"
                value={dish.description}
                onChange={handleInputChange}
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {isEditing ? "Update Dish" : "Add Dish"}
          </Button>
          <Button
            color="secondary"
            onClick={handleCancel}
            sx={{
              marginTop: 2,
              marginLeft: 2,
              bgcolor: "primary.main",
              color: "error.contrastText",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            Cancel
          </Button>
        </form>
      )}
    </>
  );
};

export default AddDishes;
