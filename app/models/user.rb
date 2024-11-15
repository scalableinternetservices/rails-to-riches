class User < ApplicationRecord
  has_secure_password
  has_many :review
  has_many :comment
  has_many :restaurant, foreign_key: 'user_id'

  def business_owner?
    role == 'business_owner'
  end
end
