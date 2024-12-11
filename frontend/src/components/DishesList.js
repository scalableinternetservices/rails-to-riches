import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { deleteDish } from "../services/api";
import AddDishes from "./AddDishes";
import ConfirmDialog from "./ConfirmDialog";

function DishesList({ dishes, isOwner, onDishesUpdate }) {
  const [selectedDish, setSelectedDish] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dishToDelete, setDishToDelete] = useState(null);

  const handleEditClick = (dish) => {
    setSelectedDish(dish);
    setShowEditForm(true);
  };

  const handleDeleteClick = (dish) => {
    setDishToDelete(dish);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteDish(dishToDelete.id);
      onDishesUpdate();
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
    setDeleteDialogOpen(false);
    setDishToDelete(null);
  };

  return (
    <>
      <Grid container spacing={4}>
        {dishes.map((dish) => (
          <Grid item xs={12} sm={6} md={4} key={dish.id}>
            <Card sx={{ height: "100%", position: "relative" }}>
              {isOwner && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Tooltip title="Edit Dish">
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(dish)}
                      sx={{
                        bgcolor: "background.paper",
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <Edit fontSize="small" color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Dish">
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(dish)}
                      sx={{
                        bgcolor: "background.paper",
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <Delete fontSize="small" color="error" />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
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

      {showEditForm && (
        <AddDishes
          initialDish={selectedDish}
          isEditing={true}
          onCancel={() => {
            setShowEditForm(false);
            setSelectedDish(null);
          }}
          onSuccess={() => {
            setShowEditForm(false);
            setSelectedDish(null);
            onDishesUpdate();
          }}
        />
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Confirm Delete"
        content={`Are you sure you want to delete ${dishToDelete?.name}?`}
        handleClose={() => {
          setDeleteDialogOpen(false);
          setDishToDelete(null);
        }}
        handleConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default DishesList;
