// src/components/PhotoGallery.js
import React, { useState } from 'react';
import { ImageList, ImageListItem, Box, Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { createPhoto, deletePhoto } from '../services/api';

function PhotoGallery({ photos, restaurantId, isOwner, onPhotosUpdate }) {
  const [isManaging, setIsManaging] = useState(false);
  const [photosToDelete, setPhotosToDelete] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("photo[image]", file);
      formData.append("photo[primary]", false);

      await createPhoto(restaurantId, formData);
      onPhotosUpdate();
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  const handleDeleteClick = (photoId) => {
    if (photosToDelete.includes(photoId)) {
      setPhotosToDelete(prev => prev.filter(id => id !== photoId));
    } else {
      setPhotosToDelete(prev => [...prev, photoId]);
    }
  };

  const handleSubmitDeletes = async () => {
    setIsSubmitting(true);
    try {
      await Promise.all(photosToDelete.map(photoId => deletePhoto(restaurantId, photoId)));
      onPhotosUpdate();
      setPhotosToDelete([]);
      setIsManaging(false);
    } catch (error) {
      console.error('Error deleting photos:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <Box>
      {/* Control Buttons */}
      {isOwner && (
        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          
          <Button
            variant="contained"
            component="label"
          >
            Upload Photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </Button>
          
          <Button
            variant="contained"
            onClick={() => {
              setIsManaging(!isManaging);
              setPhotosToDelete([]); // Clear selection when toggling manage mode
            }}
          >
            {isManaging ? 'Cancel Managing' : 'Manage Photos'}
          </Button>
          
          
          
          {isManaging && photosToDelete.length > 0 && (
            <Button
              variant="contained"
              color="error"
              onClick={handleSubmitDeletes}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Deleting...' : `Delete Selected (${photosToDelete.length})`}
            </Button>
          )}
        </Box>
      )}

      {/* Photos Grid using ImageList */}
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
          <ImageListItem 
            key={index}
            sx={{
              position: 'relative',
            }}
          >
            <img
              src={`${photo.image_url}?w=248&fit=crop&auto=format`}
              srcSet={`${photo.image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={`Img ${index + 1}`}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
                filter: photosToDelete.includes(photo.id) ? 'blur(2px)' : 'none',
                transition: 'filter 0.3s ease'
              }}
            />
            
            {isManaging && (
              <IconButton
                onClick={() => handleDeleteClick(photo.id)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: photosToDelete.includes(photo.id) 
                    ? 'error.main' 
                    : 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    backgroundColor: photosToDelete.includes(photo.id)
                      ? 'error.dark'
                      : 'rgba(255, 255, 255, 1)'
                  },
                  // Remove opacity transitions and always show the button
                  boxShadow: 1
                }}
              >
                <Delete 
                  sx={{ 
                    color: photosToDelete.includes(photo.id) ? 'white' : 'action.active'
                  }} 
                />
              </IconButton>
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default PhotoGallery;