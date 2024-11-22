class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :anonymous, :created_at, :updated_at

  # Conditionally include user information
  attribute :user_name, if: :include_user_info?
  attribute :user_id, if: :include_user_info?

  def user_name
    object.user.name
  end

  def include_user_info?
    !object.anonymous
  end
end