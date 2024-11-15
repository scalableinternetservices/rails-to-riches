module Api
  class PhotosController < ApplicationController
    # GET /photos
    def index
      @photos = Photo.all
      render json: @photos
    end

    # GET /photos/:id
    def show
      @photo = Photo.find(params[:id])
      render json: @photo
    end

    # POST /photos
    def create
      @photo = Photo.new(photo_params)

      if @photo.save
        render json: @photo, status: :created
      else
        render json: { errors: @photo.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /photos/:id
    def update
      @photo = Photo.find(params[:id])

      if @photo.update(photo_params)
        render json: @photo
      else
        render json: { errors: @photo.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # DELETE /photos/:id
    def destroy
      @photo = Photo.find(params[:id])
      @photo.destroy
      head :no_content
    end

    private

    def photo_params
      params.require(:photo).permit(:restaurant_id, :image)
    end
  end
end