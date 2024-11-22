class Restaurant < ApplicationRecord
  belongs_to :user # The business owner
  has_many :reviews, dependent: :destroy
  has_many :photos, dependent: :destroy
  has_many :dishes, dependent: :destroy

  # Validations to ensure data consistency
  validates :address, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zip, presence: true

  def update_ratings
    self.total_reviews = reviews.count
    self.average_rating = if total_reviews > 0
                            reviews.average(:rating).round(2)
                          else
                            0.0
                          end
    save
  end
end
