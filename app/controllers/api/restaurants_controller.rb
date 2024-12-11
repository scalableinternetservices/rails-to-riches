module Api
  class RestaurantsController < ApplicationController
    before_action :authorize_business_owner, only: [:create, :update, :destroy]
    skip_before_action :authorize_request, only: [:show, :index, :paged_index]

    # GET /restaurants
    def index
      @restaurants = Restaurant.all
      render json: @restaurants
    end

    # GET /restaurants_paged
    # GET /restaurants_paged?page=2&per_page=5
    def paged_index
      @restaurants = Restaurant
        .select("restaurants.*, COALESCE(AVG(reviews.rating), 0) AS average_rating")
        .joins("LEFT JOIN reviews ON reviews.restaurant_id = restaurants.id")
        .group("restaurants.id")
        .page(params[:page])
        .per(params[:per_page] || 10)
    
      render json: {
        restaurants: @restaurants.as_json(methods: :average_rating),
        current_page: @restaurants.current_page,
        total_pages: @restaurants.total_pages,
        total_count: @restaurants.total_count
      }
    end

    # GET /restaurants/:id
    def show
      @restaurant = Restaurant.find(params[:id])
      render json: @restaurant
    end

    # POST /restaurants
    def create
      # Build the restaurant for the currently logged-in user
      @restaurant = @user.restaurants.build(restaurant_params)

      if @restaurant.save
        render json: @restaurant, status: :created
      else
        render json: { errors: @restaurant.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /restaurants/:id
    def update
      @restaurant = Restaurant.find(params[:id])

      if @restaurant.user_id == @user.id
        if @restaurant.update(restaurant_params)
          render json: @restaurant
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