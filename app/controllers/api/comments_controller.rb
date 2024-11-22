module Api
  class CommentsController < ApplicationController
    skip_before_action :authorize_request, only: [:show, :index]

    # GET /restaurants/:restaurant_id/reviews/:review_id/comments
    def index
      @review = Review.find(params[:review_id])  # Find the review by its ID
      @comments = @review.comments  # Get comments for that review
      render json: @comments
    end

    # GET /comments/:id
    def show
      @comment = Comment.find(params[:id])  # Find a specific comment by ID
      render json: @comment
    end

    # POST /restaurants/:restaurant_id/reviews/:review_id/comments
    def create
      @review = Review.find(params[:review_id])  # Find the review by ID
      # Build the comment for the logged-in user and review
      @comment = @review.comments.build(comment_params)
      @comment.user = @user  # Set the logged-in user as the author of the comment

      if @comment.save
        render json: @comment, status: :created
      else
        render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /comments/:id
    def update
      @comment = Comment.find(params[:id])

      if @comment.update(comment_params)
        render json: @comment
      else
        render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # DELETE /comments/:id
    def destroy
      @comment = Comment.find(params[:id])
      @comment.destroy
      head :no_content
    end

    private

    def comment_params
      params.require(:comment).permit(:content, :anonymous)  # No user_id here, it's handled by @user
    end
  end
end
