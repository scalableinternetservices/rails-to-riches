module Api
  class DishesController < ApplicationController
    before_action :authorize_business_owner, only: [:create, :update, :destroy]
    skip_before_action :authorize_request, only: [:show, :index]

    # GET /restaurants/:restaurant_id/dishes
    def index
      @restaurant = Restaurant.find(params[:restaurant_id])
      @dishes = @restaurant.dishes
      render json: @dishes
    end

    # GET /dishes/:id
    def show
      @dish = Dish.find(params[:id])
      render json: @dish
    end

    # POST /restaurants/:restaurant_id/dishes
    def create
      @restaurant = Restaurant.find(params[:restaurant_id])
      @dish = @restaurant.dishes.build(dish_params)

      if @dish.save
        render json: @dish, status: :created
      else
        render json: { errors: @dish.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /dishes/:id
    def update
      @dish = Dish.find(params[:id])

      if @dish.update(dish_params)
        render json: @dish
      else
        render json: { errors: @dish.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # DELETE /dishes/:id
    def destroy
      @dish = Dish.find(params[:id])
      @dish.destroy
      head :no_content
    end

    private

    def dish_params
      params.require(:dish).permit(:name, :description, :price)
    end

    def authorize_business_owner
      unless @user.role == 'business_owner'
        render json: { error: 'You are not authorized to perform this action' }, status: :forbidden
      end
    end

  end
end