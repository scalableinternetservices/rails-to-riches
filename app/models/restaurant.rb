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

  belongs_to :user
  has_many :reviews, dependent: :destroy
  has_many :photos, dependent: :destroy

  # Dynamically calculate the average rating
  def average_rating
    return 0.0 if reviews.empty?

    reviews.average(:rating).to_f.round(1)
  end

  # Dynamically calculate the number of reviews
  def review_count
    reviews.count
  end
end
