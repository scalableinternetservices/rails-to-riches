module Api
  class ReviewsController < ApplicationController
    skip_before_action :authorize_request, only: [:show, :index]

    # GET /restaurants/:restaurant_id/reviews
    def index
      @restaurant = Restaurant.find(params[:restaurant_id])
      @reviews = @restaurant.reviews
      render json: @reviews
    end

    # GET /reviews/:id
    def show
      @review = Review.find(params[:id])
      render json: @review
    end

    # POST /restaurants/:restaurant_id/reviews
    def create
      @restaurant = Restaurant.find(params[:restaurant_id])
      # Build the review for the currently logged-in user and the restaurant
      @review = @restaurant.reviews.build(review_params)
      @review.user = @user  # Set the review's user to the logged-in user

      if @review.save
        render json: @review, status: :created
      else
        render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /reviews/:id
    def update
      @review = Review.find(params[:id])

      if @review.update(review_params)
        render json: @review
      else
        render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # DELETE /reviews/:id
    def destroy
      @review = Review.find(params[:id])
      @review.destroy
      head :no_content
    end

    private

    def review_params
      params.require(:review).permit(:rating, :content) # Do not pass user_id, it's handled by @user
    end
  end
end
