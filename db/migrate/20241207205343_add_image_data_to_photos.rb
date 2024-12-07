class AddImageDataToPhotos < ActiveRecord::Migration[7.1]
  def change
    add_column :photos, :image_data, :binary
  end
end
