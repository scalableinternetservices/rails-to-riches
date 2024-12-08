class CreateDishes < ActiveRecord::Migration[7.1]
  def change
    create_table :dishes do |t|
      t.string :name
      t.text :description
      t.decimal :price
      t.references :restaurant, null: false, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
