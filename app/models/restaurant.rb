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
end
