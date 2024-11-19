class CreateRestaurants < ActiveRecord::Migration[7.1]
  def change
    create_table :restaurants do |t|
      t.references :user, null: false, foreign_key: true # Business owner
      t.string :name
      t.string :address
      t.string :city
      t.string :state
      t.string :zip
      t.text :description
      t.string :phone_number
      t.string :website
      t.timestamps
    end
  end
end
