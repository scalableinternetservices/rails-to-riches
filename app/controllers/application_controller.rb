class ApplicationController < ActionController::API
  before_action :authorize_request

  private

  def authorize_request
    token = request.headers['Authorization']&.split(' ')&.last
    if token
      decoded_token = JWT.decode(token, Rails.application.secret_key_base, true, { algorithm: 'HS256' })
      @user = User.find(decoded_token[0]['user_id'])
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  rescue JWT::DecodeError
    render json: { error: 'Invalid or missing token' }, status: :unauthorized
  end
end
