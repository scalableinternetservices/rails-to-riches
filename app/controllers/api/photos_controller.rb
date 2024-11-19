module Api
  class PhotosController < ApplicationController
    before_action :set_restaurant, only: %i[index create]
    before_action :set_photo, only: %i[show update destroy]

    # GET /restaurants/:restaurant_id/photos
    def index
      # Get all photos for the specific restaurant, and include the URL of each image
      @photos = @restaurant.photos.map do |photo|
        {
          id: photo.id,
          image_url: url_for(photo.image)  # Get the URL of the image
        }
      end
      render json: @photos
    end

    # GET /photos/:id
    def show
      render json: {
        id: @photo.id,
        image_url: url_for(@photo.image)  # Get the URL of the specific photo image
      }
    end

    # POST /restaurants/:restaurant_id/photos
    def create
      @photo = @restaurant.photos.build(photo_params)  # Associate photo with restaurant

      if @photo.save
        render json: { id: @photo.id, image_url: url_for(@photo.image) }, status: :created
      else
        render json: { errors: @photo.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /photos/:id
    def update
      if @photo.update(photo_params)  # Update photo
        render json: { id: @photo.id, image_url: url_for(@photo.image) }
      else
        render json: { errors: @photo.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # DELETE /photos/:id
    def destroy
      @photo.destroy  # Delete photo
      head :no_content
    end

    private

    # Set the restaurant (used for index and create actions)
    def set_restaurant
      @restaurant = Restaurant.find_by(id: params[:restaurant_id])
      render json: { error: 'Restaurant not found' }, status: :not_found unless @restaurant
    end

    # Set the photo for update, show, and destroy actions
    def set_photo
      @photo = Photo.find_by(id: params[:id])  # Find the photo by ID
      render json: { error: 'Photo not found' }, status: :not_found unless @photo
    end

    def photo_params
      params.require(:photo).permit(:image)  # Only permit the photo image
    end
  end
end
