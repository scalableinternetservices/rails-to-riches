// src/components/ReviewsList.js
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  Avatar,
  Grid,
  Divider,
} from '@mui/material';

function ReviewsList({ reviews }) {
  return (
    <Box>
      {reviews.map((review) => (
        <Card key={review.id} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar>{review.user.charAt(0)}</Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h6">{review.user}</Typography>
                <Rating value={review.rating} readOnly />
              </Grid>
            </Grid>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {review.content}
            </Typography>
            {/* Comments */}
            {review.comments && review.comments.length > 0 && (
              <Box sx={{ mt: 2, pl: 4 }}>
                <Divider sx={{ mb: 2 }} />
                {review.comments.map((comment) => (
                  <Box key={comment.id} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, mr: 1 }}>{comment.user.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="subtitle2">{comment.user}</Typography>
                      <Typography variant="body2">{comment.content}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ReviewsList;
