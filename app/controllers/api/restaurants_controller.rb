module Api
  class RestaurantsController < ApplicationController
    # GET /restaurants
    def index
      @restaurants = Restaurant.all
      render json: @restaurants
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
