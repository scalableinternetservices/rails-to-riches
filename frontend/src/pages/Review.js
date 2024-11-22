import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Grid from "@mui/material/Grid2";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { createReview } from "../services/api";
import LinearProgressBar from "../components/LinearProgressBar";
import BasicDialog from "../components/BasicDialog";
import { useParams } from 'react-router-dom';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Review(handleFetchReviews) {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [content, setContent] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await createReview(id, {
        rating: rating,
        content: content,
        anonymous: isAnonymous
      });
      if (response.status === 201) {
        //setOpen(true);
        handleFetchReviews()
      } else {
      }
    } catch (error) {
      setIsSubmitting(true);
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
                placeholder="Add your comments"
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
