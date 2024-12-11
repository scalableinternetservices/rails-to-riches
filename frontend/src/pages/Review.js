import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Grid from "@mui/material/Grid2";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { createReview, updateReview } from "../services/api";
import LinearProgressBar from "../components/LinearProgressBar";
import BasicDialog from "../components/BasicDialog";
import { useParams } from "react-router-dom";

export default function Review({
  initialReview,
  isEditing,
  onCancel,
  handleFetchReviews,
}) {
  const { id } = useParams();
  const [rating, setRating] = useState(initialReview?.rating || 0);
  const [isAnonymous, setIsAnonymous] = useState(
    initialReview?.anonymous || false
  );
  const [content, setContent] = useState(initialReview?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      let response;
      if (isEditing) {
        response = await updateReview(initialReview.id, {
          rating,
          content,
          anonymous: isAnonymous,
        });
      } else {
        response = await createReview(id, {
          rating,
          content,
          anonymous: isAnonymous,
        });
      }

      if (response.status === 200 || response.status === 201) {
        setOpen(true);
        handleFetchReviews();
        if (onCancel) onCancel();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleReviewSubmit} noValidate>
        <LinearProgressBar show={isSubmitting} />
        <Typography variant="subtitle1">
          <Grid container rowSpacing={1}>
            <Grid size={12}>
              <Rating
                name="ratings"
                value={rating}
                precision={0.5}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </Grid>
            <Grid size={12}>
              <TextField
                placeholder="Add your Review"
                multiline
                maxRows={4}
                fullWidth
                value={content}
                onChange={(event) => {
                  setContent(event.target.value);
                }}
              />
            </Grid>
            <Grid size={12}>
              <Checkbox
                checked={isAnonymous}
                onChange={(event) => {
                  setIsAnonymous(event.target.checked);
                }}
                inputProps={{ "aria-label": "controlled" }}
                sx={{ padding: 0.3, paddingLeft: 0 }}
              />
              Post as Anonymous
            </Grid>
            <Grid size={12}>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Submit Review
              </Button>
            </Grid>
            {isEditing && (
              <Grid size={12}>
                <Button onClick={onCancel} variant="outlined" sx={{ ml: 1 }}>
                  Cancel
                </Button>
              </Grid>
            )}
          </Grid>
        </Typography>
        <BasicDialog
          title={"Review Posted"}
          content={"Thank you for submitting your review."}
          open={open}
        />
      </Box>
    </>
  );
}
