import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { createDish } from "../services/api";
import { useParams } from 'react-router-dom';

const AddDishes = () => {
    const { id } = useParams();
  const [dish, setDish] = useState({ name: '', description: '', price: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDish({ ...dish, [name]: value });
  };

  const handleAddDish = async (event) => {
    event.preventDefault();
    if (dish.name && dish.description && dish.price) {
      setDish({ name: dish.name, description: dish.description, price: dish.price});
      try {
        const response = await createDish(id, dish);
        if (response.status === 201) {
        } else {
        }
      } catch (error) {
      } finally {
      }
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add a Dish
      </Typography>
      <TextField
        label="Dish Name"
        name="name"
        value={dish.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        name="description"
        value={dish.description}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        value={dish.price}
        onChange={handleInputChange}
        type="number"
        fullWidth
        margin="normal"
        required
      />
      <Button variant="contained" color="primary" onClick={handleAddDish} fullWidth sx={{ mt: 2 }}>
        Add Dish
      </Button>
    </Box>
  );
};

export default AddDishes;
