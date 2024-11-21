import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { addComment } from "../services/api";
import LinearProgressBar from "../components/LinearProgressBar";

export default function Comment() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [comment, setComment] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await addComment(comment, isAnonymous);
      if (response.status === 200) {
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
                onChange={(event) => {
                  setComment(event.target.value);
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
                Submit Comment
              </Button>
            </Grid>
          </Grid>
        </Typography>
      </Box>
    </>
  );
}
