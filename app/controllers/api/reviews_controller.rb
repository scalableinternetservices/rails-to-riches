module Api
  class ReviewsController < ApplicationController
    # GET /reviews
    def index
      @reviews = Review.all
      render json: @reviews
    end

    # GET /reviews/:id
    def show
      @review = Review.find(params[:id])
      render json: @review
    end

    # POST /reviews
    def create
      @review = Review.new(review_params)

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
      params.require(:review).permit(:user_id, :restaurant_id, :rating, :content)
    end
  end
end