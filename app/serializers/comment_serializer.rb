class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_name

  def user_name
    object.user.name
  end
end
