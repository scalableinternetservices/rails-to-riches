import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  Avatar,
  Grid,
  Divider,
} from "@mui/material";
import Comment from "../components/Comment";
import Link from "@mui/material/Link";

function ReviewsList({ reviews, fetchReviews }) {
  const [openComments, setOpenComments] = React.useState({});

  const handleToggleComment = (reviewId) => {
    setOpenComments((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  return (
    <Box>
      {reviews.map((review) => (
        <Card key={review.id} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar>
                  {review.user_name ? review.user_name.charAt(0) : "A"}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h6">
                  {review.user_name ?? "Anonymous"}
                </Typography>
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
                  <Box
                    key={comment.id}
                    sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                  >
                    <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                      {comment.user_name ? comment.user_name.charAt(0) : "A"}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        {comment.user_name ?? "Anonymous"}
                      </Typography>
                      <Typography variant="body2">
                        {comment.content}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            <Link onClick={() => handleToggleComment(review.id)} component="button">
              Reply
            </Link>
            {openComments[review.id] && <Comment reviewId={review.id} onCommentSubmitted={fetchReviews}/>}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ReviewsList;