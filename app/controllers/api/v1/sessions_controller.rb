class Api::V1::SessionsController < ApplicationController
    def create
      user = User.find_by(email: params[:email])
      if user&.authenticate(params[:password])
        token = encode_token({ user_id: user.id })
        render json: { jwt: token, user: user }, status: :accepted
      else
        render json: { error: 'Invalid Email or Password' }, status: :unauthorized
      end
    end
  
    # Optional logout method if needed
    def destroy
      # Handle logout logic if necessary
    end
  end
  