class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :review

  def owner_reply?
    user == review.restaurant.user
  end
end
