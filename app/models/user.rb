# app/models/user.rb
class User < ApplicationRecord
  has_secure_password

  has_many :reviews
  has_many :comments
  has_many :restaurants, foreign_key: 'user_id'

  validates :email, presence: true, uniqueness: true
  validates :name, presence: true

  def business_owner?
    role == 'business_owner'
  end
end
