# app/controllers/concerns/exception_handler.rb
module ExceptionHandler
    extend ActiveSupport::Concern
  
    class InvalidToken < StandardError; end
  
    included do
      rescue_from ActiveRecord::RecordNotFound, with: :not_found
      rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
      rescue_from ExceptionHandler::InvalidToken, with: :invalid_token
  
      rescue_from JWT::DecodeError, with: :invalid_token
    end
  
    private
  
    def not_found(e)
      render json: { errors: e.message }, status: :not_found
    end
  
    def unprocessable_entity(e)
      render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end
  
    def invalid_token(e)
      render json: { errors: e.message }, status: :unauthorized
    end
  end
  