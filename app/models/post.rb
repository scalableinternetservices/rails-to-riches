class Post < ApplicationRecord
  belongs_to :user, optional: true  # For unauthenticated users
  has_many :comments
end
