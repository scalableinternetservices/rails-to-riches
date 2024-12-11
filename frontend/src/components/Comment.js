import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { createComment, updateComment } from "../services/api";
import LinearProgressBar from "../components/LinearProgressBar";
import { useParams } from "react-router-dom";

export default function Comment({
  reviewId,
  initialComment,
  isEditing,
  onCancel,
  onCommentSubmitted,
}) {
  const { id } = useParams();
  const [isAnonymous, setIsAnonymous] = useState(
    initialComment?.anonymous || false
  );
  const [comment, setComment] = useState(initialComment?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      let response;
      if (isEditing) {
        response = await updateComment(initialComment.id, {
          content: comment,
          anonymous: isAnonymous,
        });
      } else {
        response = await createComment(id, reviewId, {
          content: comment,
          anonymous: isAnonymous,
        });
      }

      if (response.status === 200 || response.status === 201) {
        setComment("");
        setIsAnonymous(false);
        if (onCommentSubmitted) {
          onCommentSubmitted();
        }
        if (onCancel) onCancel();
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleCommentSubmit} noValidate m={2}>
      <LinearProgressBar show={isSubmitting} />
      <Typography variant="subtitle1">
        <Grid container rowSpacing={1}>
          <Grid size={12}>
            <TextField
              placeholder="Add your comments"
              multiline
              maxRows={4}
              fullWidth
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </Grid>
          <Grid size={12}>
            <Checkbox
              checked={isAnonymous}
              onChange={(event) => setIsAnonymous(event.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
              sx={{ padding: 0.3, paddingLeft: 0 }}
            />
            Post as Anonymous
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Submit Comment
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
    </Box>
  );
}
