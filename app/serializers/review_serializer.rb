class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :content, :user_name

  def user_name
    object.user.name
  end
end
