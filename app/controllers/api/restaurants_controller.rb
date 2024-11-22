module Api
  class RestaurantsController < ApplicationController
    before_action :authorize_business_owner, only: [:create, :update, :destroy]
    skip_before_action :authorize_request, only: [:show, :index]

    # GET /restaurants
    def index
      @restaurants = Restaurant.all
      render json: @restaurants.map do |restaurant|
        restaurant.as_json.merge(
          average_rating: restaurant.average_rating,
          review_count: restaurant.review_count
        )
      end
    end

    # GET /restaurants/:id
    def show
      @restaurant = Restaurant.find(params[:id])
      render json: @restaurant.as_json.merge(
        average_rating: @restaurant.average_rating,
        review_count: @restaurant.review_count
      )
    end

    # POST /restaurants
    def create
      @restaurant = @user.restaurants.build(restaurant_params)

      if @restaurant.save
        render json: @restaurant.as_json.merge(
          average_rating: @restaurant.average_rating,
          review_count: @restaurant.review_count
        ), status: :created
      else
        render json: { errors: @restaurant.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /restaurants/:id
    def update
      @restaurant = Restaurant.find(params[:id])

      if @restaurant.user_id == @user.id
        if @restaurant.update(restaurant_params)
          render json: @restaurant.as_json.merge(
            average_rating: @restaurant.average_rating,
            review_count: @restaurant.review_count
          )
        else
          render json: { errors: @restaurant.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: 'You are not authorized to update this restaurant' }, status: :forbidden
      end
    end

    # DELETE /restaurants/:id
    def destroy
      @restaurant = Restaurant.find(params[:id])

      if @restaurant.user_id == @user.id
        @restaurant.destroy
        head :no_content
      else
        render json: { error: 'You are not authorized to delete this restaurant' }, status: :forbidden
      end
    end

    private

    def authorize_business_owner
      unless @user.role == 'business_owner'
        render json: { error: 'You are not authorized to perform this action' }, status: :forbidden
      end
    end

    def restaurant_params
      params.require(:restaurant).permit(
        :name,
        :address,
        :city,
        :state,
        :zip,
        :description,
        :phone_number,
        :website
      )
    end
  end
end