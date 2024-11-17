# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
    include ExceptionHandler
  
    # Protect routes
    before_action :authorize_request
  
    attr_reader :current_user
  
    private
  
    def authorize_request
      header = request.headers['Authorization']
      header = header.split(' ').last if header
      begin
        decoded = JsonWebToken.decode(header)
        @current_user = User.find(decoded[:user_id])
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: 'User not found' }, status: :unauthorized
      rescue JWT::DecodeError => e
        render json: { errors: 'Invalid token' }, status: :unauthorized
      end
    end
  end
  