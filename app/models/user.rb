
class User < ApplicationRecord
    has_secure_password
    has_one :profile
    has_many :posts
    has_many :comments
    has_many :sent_messages, class_name: 'Message', foreign_key: 'sender_id'
    has_many :received_messages, class_name: 'Message', foreign_key: 'receiver_id'
  
    validates :email, presence: true, uniqueness: true
    validates :password, confirmation: true
  end
  