class CreateReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :reviews do |t|
      t.references :users, null: false, foreign_key: true
      t.references :restaurants, null: false, foreign_key: true
      t.integer :rating, null: false
      t.text :content
      t.timestamps
    end
  end
end
