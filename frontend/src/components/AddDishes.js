import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { createDish } from "../services/api";
import { useParams } from "react-router-dom";

const AddDishes = () => {
  const { id } = useParams();
  const [showDishForm, setShowDishForm] = useState(false);
  const [dish, setDish] = useState({ name: "", description: "", price: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDish({ ...dish, [name]: value });
  };

  const handleAddDish = async (event) => {
    event.preventDefault();
    if (dish.name && dish.description && dish.price) {
      setDish({
        name: dish.name,
        description: dish.description,
        price: dish.price,
      });
      try {
        const response = await createDish(id, dish);
        if (response.status === 201) {
          // Dish added successfully
        } else {
          // Handle other statuses
        }
      } catch (error) {
        // Handle error
      }
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <>
      {!showDishForm && (
        <Button
          color="secondary"
          onClick={() => {
            setShowDishForm(!showDishForm);
          }}
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
      {showDishForm && (
        <form onSubmit={handleAddDish}>
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
            Add Dish
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setShowDishForm(!showDishForm);
            }}
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
