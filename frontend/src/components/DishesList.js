// src/components/DishesList.js
import React from 'react';
import { Grid, Card, CardContent, Typography, Chip, Box } from '@mui/material';

function DishesList({ dishes }) {
  return (
    <Grid container spacing={4}>
      {dishes.map((dish) => (
        <Grid item xs={12} sm={6} md={4} key={dish.id}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {dish.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {dish.description}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip label={`Price: $${dish.price}`} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default DishesList;