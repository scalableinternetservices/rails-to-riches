class AddRatingsAndReviewsToRestaurants < ActiveRecord::Migration[7.1]
  def change
    add_column :restaurants, :average_rating, :decimal, precision: 3, scale: 2, default: 0.0
    add_column :restaurants, :total_reviews, :integer, default: 0
  end
end