// src/components/PhotoGallery.js
import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';

function PhotoGallery({ photos }) {
  return (
    <ImageList
      variant="standard"
      cols={3}
      gap={8}
      rowHeight={200}
      sx={{
        borderRadius: 2,
      }}
    >
      {photos.map((photo, index) => (
        <ImageListItem key={index}>
          <img
            src={`${photo}?w=248&fit=crop&auto=format`}
            srcSet={`${photo}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={`Restaurant Photo ${index + 1}`}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px', 
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default PhotoGallery;
