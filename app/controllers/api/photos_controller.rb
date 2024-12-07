module Api
  class PhotosController < ApplicationController
    before_action :set_restaurant, only: [:index, :create, :primary_photo]
    before_action :set_photo, only: [:show, :update, :destroy]
    before_action :authorize_business_owner, only: [:create, :update, :destroy]
    skip_before_action :authorize_request, only: [:show, :index, :primary_photo]

    # GET /restaurants/:restaurant_id/primary_photo
    def primary_photo
      primary_photo = @restaurant.photos.find_by(primary: true)

      if primary_photo
        render json: {
          id: primary_photo.id,
          image_url: primary_photo.image.present? ? base64_image_data(primary_photo) : nil,
          primary: primary_photo.primary
        }
      else
        render json: { image_url: "" }
      end
    end

    # GET /restaurants/:restaurant_id/photos
    def index
      @photos = @restaurant.photos.map do |photo|
        {
          id: photo.id,
          image_url: photo.image.present? ? base64_image_data(photo) : nil,
          primary: photo.primary
        }
      end
      render json: @photos
    end

    # GET /photos/:id
    def show
      render json: {
        id: @photo.id,
        image_url: @photo.image.present? ? base64_image_data(@photo) : nil,
        primary: @photo.primary
      }
    end

    # POST /restaurants/:restaurant_id/photos
    def create
      @photo = @restaurant.photos.build(photo_params)

      if @photo.primary
        @restaurant.photos.where(primary: true).update_all(primary: false)
      end

      if @photo.save
        render json: {
          id: @photo.id,
          image_url: @photo.image.present? ? base64_image_data(@photo) : nil,
          primary: @photo.primary
        }, status: :created
      else
        render json: { errors: @photo.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /photos/:id
    def update
      if photo_params[:primary] && photo_params[:primary] != @photo.primary
        @photo.restaurant.photos.where(primary: true).update_all(primary: false)
      end

      if @photo.update(photo_params)
        render json: {
          id: @photo.id,
          image_url: @photo.image.present? ? base64_image_data(@photo) : nil,
          primary: @photo.primary
        }
      else
        render json: { errors: @photo.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # DELETE /photos/:id
    def destroy
      @photo.destroy
      head :no_content
    end

    private

    def set_restaurant
      @restaurant = Restaurant.find_by(id: params[:restaurant_id])
      render json: { error: 'Restaurant not found' }, status: :not_found unless @restaurant
    end

    def set_photo
      @photo = Photo.find_by(id: params[:id])
      render json: { error: 'Photo not found' }, status: :not_found unless @photo
    end

    def photo_params
      params.require(:photo).permit(:image, :primary)
    end

    def authorize_business_owner
      unless @user.role == 'business_owner'
        render json: { error: 'You are not authorized to perform this action' }, status: :forbidden
      end
    end

    def base64_image_data(photo)
      "data:image/jpeg;base64,#{Base64.strict_encode64(photo.image_data)}"
    end
  end
end