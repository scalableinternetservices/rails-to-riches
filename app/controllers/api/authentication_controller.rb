# app/controllers/api/authentication_controller.rb
module Api
  class AuthenticationController < ApplicationController
    skip_before_action :authorize_request, only: [:signup, :login] # Allow public access to these actions

    # POST /api/signup
    def signup
      @user = User.new(user_params)
      if @user.save
        token = encode_token(user_id: @user.id)
        render json: { jwt: token, user: user_response(@user) }, status: :created
      else
        # Check if the error is related to email uniqueness
        if @user.errors[:email].include?('has already been taken')
          render json: { errors: ['This email is already registered. Please use a different email.'] }, status: :unprocessable_entity
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end
    end

    # POST /api/login
    def login
      @user = User.find_by(email: params[:user][:email])
      if @user&.authenticate(params[:user][:password])
        token = encode_token(user_id: @user.id)
        render json: { jwt: token, user: user_response(@user) }, status: :ok
      else
        render json: { error: 'Invalid credentials' }, status: :unauthorized
      end
    end

    private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :role)
    end

    def encode_token(payload)
      JWT.encode(payload, Rails.application.secrets.secret_key_base)
    end

    def user_response(user)
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    end
  end
end
