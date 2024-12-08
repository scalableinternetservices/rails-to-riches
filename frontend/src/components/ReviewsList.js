import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  Avatar,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Comment from "../components/Comment";
import Link from "@mui/material/Link";
import Review from "../pages/Review";
import ConfirmDialog from "../components/ConfirmDialog";
import { deleteReview, deleteComment } from "../services/api";

function ReviewsList({ reviews, fetchReviews }) {
  const { user } = useContext(AuthContext);
  const [openComments, setOpenComments] = React.useState({});
  const [editingReview, setEditingReview] = React.useState(null);
  const [editingComment, setEditingComment] = React.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);

  const handleToggleComment = (reviewId) => {
    setOpenComments((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  const handleDeleteClick = (item, type) => {
    setItemToDelete({ ...item, type });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (itemToDelete.type === "review") {
        await deleteReview(itemToDelete.id);
      } else {
        await deleteComment(itemToDelete.id);
      }
      fetchReviews();
    } catch (error) {
      console.error("Error deleting:", error);
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
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
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h6">
                      {review.user_name ?? "Anonymous"}
                    </Typography>
                    <Rating value={review.rating} readOnly />
                  </Box>
                  {user?.id === review.user_id && (
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => setEditingReview(review)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(review, "review")}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
            {editingReview?.id === review.id ? (
              <Review
                initialReview={review}
                isEditing={true}
                onCancel={() => setEditingReview(null)}
                handleFetchReviews={() => {
                  fetchReviews();
                  setEditingReview(null);
                }}
              />
            ) : (
              <Typography variant="body1" sx={{ mt: 1 }}>
                {review.content}
              </Typography>
            )}

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
                    <Box sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography variant="subtitle2">
                          {comment.user_name ?? "Anonymous"}
                        </Typography>
                        {user?.id === comment.user_id && (
                          <Box>
                            <IconButton
                              size="small"
                              onClick={() => setEditingComment(comment)}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDeleteClick(
                                  { ...comment, review_id: review.id },
                                  "comment"
                                )
                              }
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                      {editingComment?.id === comment.id ? (
                        <Comment
                          reviewId={review.id}
                          initialComment={comment}
                          isEditing={true}
                          onCancel={() => setEditingComment(null)}
                          onCommentSubmitted={() => {
                            fetchReviews();
                            setEditingComment(null);
                          }}
                        />
                      ) : (
                        <Typography variant="body2">
                          {comment.content}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            <Link
              onClick={() => handleToggleComment(review.id)}
              component="button"
            >
              Reply
            </Link>
            {openComments[review.id] && !editingComment && (
              <Comment reviewId={review.id} onCommentSubmitted={fetchReviews} />
            )}
          </CardContent>
        </Card>
      ))}

      <ConfirmDialog
        open={deleteDialogOpen}
        title={`Delete ${
          itemToDelete?.type === "review" ? "Review" : "Comment"
        }`}
        content={`Are you sure you want to delete this ${itemToDelete?.type}?`}
        handleClose={() => {
          setDeleteDialogOpen(false);
          setItemToDelete(null);
        }}
        handleConfirm={handleDeleteConfirm}
      />
    </Box>
  );
}

export default ReviewsList;
