class AddAnonymousToReviewsAndComments < ActiveRecord::Migration[7.1]
  def change
    add_column :reviews, :anonymous, :boolean, default: false, null: false
    add_column :comments, :anonymous, :boolean, default: false, null: false
  end
end