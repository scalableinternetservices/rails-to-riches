class User < ApplicationRecord
  has_secure_password
  has_many :reviews
  has_many :comments
  has_many :restaurants

  def business_owner?
    role == 'business_owner'
  end
end
