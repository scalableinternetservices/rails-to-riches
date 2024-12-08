# db/seeds.rb
require 'faker'

# Clear existing data
puts "Clearing existing data..."
Restaurant.destroy_all
Dish.destroy_all
Review.destroy_all
Comment.destroy_all
Photo.destroy_all
User.destroy_all

# Constants
USER_COUNT = 5
RESTAURANTS_PER_USER = 5
DISHES_PER_RESTAURANT = 10
REVIEWS_PER_RESTAURANT = 15
COMMENTS_PER_REVIEW = 5
PHOTOS_PER_RESTAURANT = 3

# Helper method to get current timestamp
current_time = Time.now

# Insert Users
puts "Inserting users..."
users = USER_COUNT.times.map do
  {
    name: Faker::Name.name,
    email: Faker::Internet.unique.email,
    password_digest: BCrypt::Password.create('password'), # Ensure passwords are hashed
    role: "business_owner",
    created_at: current_time,
    updated_at: current_time
  }
end
User.insert_all(users)
user_ids = User.pluck(:id)

# Insert Restaurants
puts "Inserting restaurants..."
restaurants = []
user_ids.each do |user_id|
  RESTAURANTS_PER_USER.times do
    restaurants << {
      name: Faker::Restaurant.name,
      address: Faker::Address.street_address,
      city: Faker::Address.city,
      state: Faker::Address.state_abbr,
      zip: Faker::Address.zip_code,
      description: Faker::Restaurant.description,
      phone_number: Faker::PhoneNumber.phone_number,
      website: Faker::Internet.url,
      user_id: user_id,
      created_at: current_time,
      updated_at: current_time
    }
  end
end

puts "Now inserting..."
Restaurant.insert_all(restaurants)
restaurant_ids = Restaurant.pluck(:id)

# Insert Dishes
puts "Inserting dishes..."
dishes = []
restaurant_ids.each do |restaurant_id|
  DISHES_PER_RESTAURANT.times do
    dishes << {
      name: Faker::Food.dish,
      description: Faker::Food.description,
      price: Faker::Commerce.price(range: 5..50),
      restaurant_id: restaurant_id,
      created_at: current_time,
      updated_at: current_time
    }
  end
end
Dish.insert_all(dishes)

# Insert Reviews
puts "Inserting reviews..."
reviews = []
restaurant_ids.each do |restaurant_id|
  REVIEWS_PER_RESTAURANT.times do
    reviews << {
      rating: rand(1..5),
      content: Faker::Lorem.sentence(word_count: 20),
      user_id: user_ids.sample,
      restaurant_id: restaurant_id,
      created_at: current_time,
      updated_at: current_time
    }
  end
end
Review.insert_all(reviews)
review_ids = Review.pluck(:id)

# Insert Comments
puts "Inserting comments..."
comments = []
review_ids.each do |review_id|
  COMMENTS_PER_REVIEW.times do
    comments << {
      content: Faker::Lorem.sentence(word_count: 10),
      user_id: user_ids.sample,
      review_id: review_id,
      created_at: current_time,
      updated_at: current_time
    }
  end
end
Comment.insert_all(comments)

# Insert Photos
puts "Inserting photos..."
photos = []
current_time = Time.now

restaurant_ids.each do |restaurant_id|
  PHOTOS_PER_RESTAURANT.times do |i|
    photos << {
      primary: i == 0,
      restaurant_id: restaurant_id,
      created_at: current_time,
      updated_at: current_time
    }
  end
end
# Bulk insert photos without attaching images
Photo.insert_all(photos)
# Now attach images after the photos are inserted
photos = Photo.order(:id).last(restaurant_ids.size * PHOTOS_PER_RESTAURANT)
photos.each_with_index do |photo, index|
  # You can use a different image for each photo or repeat the same image
  photo.image.attach(
    io: File.open("./db/woodstock.webp"),
    filename: "woodstock_#{index + 1}.webp",
    content_type: 'image/webp'
  )
end
puts "Photos inserted and images attached!"

puts "Seeding completed!"
