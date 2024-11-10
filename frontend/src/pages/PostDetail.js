// src/pages/PostDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const PostDetail = () => {
  const { id } = useParams();

  return (
    <Container>
      <Typography variant="h4" color="primary.main" sx={{ mt: 4 }}>
        Post Detail - ID: {id}
      </Typography>
      {/* Fetch and display post details based on ID */}
    </Container>
  );
};

export default PostDetail;
