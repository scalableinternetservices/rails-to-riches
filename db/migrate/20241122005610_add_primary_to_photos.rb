class AddPrimaryToPhotos < ActiveRecord::Migration[7.1]
  def change
    add_column :photos, :primary, :boolean
  end
end
