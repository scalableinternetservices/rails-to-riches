class Photo < ApplicationRecord
  belongs_to :restaurant
  has_one_attached :image

  validate :only_one_primary_photo

  private

  def only_one_primary_photo
    if primary && restaurant.photos.where(primary: true).exists?
      errors.add(:primary, "Only one primary photo per restaurant is allowed")
    end
  end
end
