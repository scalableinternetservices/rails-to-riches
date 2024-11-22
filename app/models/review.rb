class Review < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant
  has_many :comments, dependent: :destroy

  after_create :update_restaurant_ratings
  after_update :update_restaurant_ratings
  after_destroy :update_restaurant_ratings

  private

  def update_restaurant_ratings
    restaurant.update_ratings
  end
end
