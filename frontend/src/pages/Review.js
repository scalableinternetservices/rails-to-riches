import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Grid from "@mui/material/Grid2";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { addreview } from "../services/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Review() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rating, setRating] = React.useState(0);
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [content, setContent] = React.useState();

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addreview(rating, content, isAnonymous);
      if (response.status === 200) {
      } else {
      }
    } catch (error) {}
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add your review</Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={style}
          component="form"
          onSubmit={handleReviewSubmit}
          noValidate
        >
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
                <Button type="submit" variant="contained">
                  Submit Review
                </Button>
              </Grid>
            </Grid>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
