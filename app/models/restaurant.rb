class Restaurant < ApplicationRecord
  belongs_to :user # The business owner
  has_many :review, dependent: :destroy
  has_many :photo, dependent: :destroy

  # Validations to ensure data consistency
  validates :address, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zip, presence: true
end
