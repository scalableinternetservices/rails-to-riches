class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :review, null: false, foreign_key: { on_delete: :cascade }
      t.text :content
      t.timestamps
    end
  end
end
