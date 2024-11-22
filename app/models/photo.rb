class Photo < ApplicationRecord
  belongs_to :restaurant
  has_one_attached :image

  validates :primary, uniqueness: { scope: :restaurant_id, message: "Only one primary photo per restaurant is allowed" }
end
