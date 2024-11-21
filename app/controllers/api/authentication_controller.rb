# app/controllers/api/authentication_controller.rb

module Api
  class AuthenticationController < ApplicationController
    skip_before_action :authorize_request, only: [:login, :signup]

    # POST /api/login
    def login
      @user = User.find_by(email: params[:email])
      if @user&.authenticate(params[:password])
        token = JsonWebToken.encode(user_id: @user.id)
        render json: { jwt: token, user: @user }, status: :ok
      else
        render json: { errors: ['Invalid email or password'] }, status: :unauthorized
      end
    end

    # POST /api/signup
    def signup
      @user = User.new(user_params)
      if @user.save
        token = JsonWebToken.encode(user_id: @user.id)
        render json: { jwt: token, user: @user }, status: :created
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :role)
    end
  end
end
