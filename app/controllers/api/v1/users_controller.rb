# app/controllers/api/v1/users_controller.rb
class Api::V1::UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]
  
    def create
      user = User.new(user_params)
      if user.save
        token = encode_token({ user_id: user.id })
        render json: { jwt: token, user: user }, status: :created
      else
        render json: { error: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def show
      render json: @current_user
    end
  
    private
  
    def user_params
      params.permit(:email, :password, :password_confirmation)
    end
  end
  