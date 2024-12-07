class Photo < ApplicationRecord
  belongs_to :restaurant

  validate :only_one_primary_photo

  # Decode the binary data to a file
  def image
    StringIO.new(image_data) if image_data.present?
  end

  # Encode the file to binary data
  def image=(file)
    self.image_data = file.read if file.present?
  end

  private

  def only_one_primary_photo
    if primary && restaurant.photos.where(primary: true).exists?
      errors.add(:primary, "Only one primary photo per restaurant is allowed")
    end
  end
end
