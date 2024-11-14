class Comment < ApplicationRecord
  belongs_to :user, optional: true  # For unauthenticated users
  belongs_to :post
end
