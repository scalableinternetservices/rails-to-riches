# db/seeds.rb
require 'faker'

# Clear existing data
puts "Clearing existing data..."
User.destroy_all
Restaurant.destroy_all
Dish.destroy_all
Review.destroy_all
Comment.destroy_all
Photo.destroy_all

# Constants
USER_COUNT = 5
RESTAURANTS_PER_USER = 5
DISHES_PER_RESTAURANT = 10
REVIEWS_PER_RESTAURANT = 15
COMMENTS_PER_REVIEW = 5
PHOTOS_PER_RESTAURANT = 3

# Insert Users
puts "Inserting users..."
users = USER_COUNT.times.map do |i|
  {
    name: "User #{i + 1}",
    email: "user#{i + 1}@example.com",
    password_digest: BCrypt::Password.create('password'), # Ensure passwords are hashed
    role: "business_owner",
    created_at: Time.now,
    updated_at: Time.now
  }
end
User.insert_all(users)
user_ids = User.pluck(:id)

# Insert Restaurants and associated data
puts "Inserting restaurants and associated data..."
restaurants = []
dishes = []
reviews = []
comments = []

user_ids.each do |user_id|
  RESTAURANTS_PER_USER.times do
    restaurant = {
      name: Faker::Restaurant.name,
      address: Faker::Address.street_address,
      city: Faker::Address.city,
      state: Faker::Address.state_abbr,
      zip: Faker::Address.zip_code,
      description: Faker::Restaurant.description,
      phone_number: Faker::PhoneNumber.phone_number,
      website: Faker::Internet.url,
      user_id: user_id,
      created_at: Time.now,
      updated_at: Time.now
    }
    restaurants << restaurant
  end
end
Restaurant.insert_all(restaurants)
restaurant_ids = Restaurant.pluck(:id)

restaurant_ids.each do |restaurant_id|
  # Insert Dishes
  DISHES_PER_RESTAURANT.times do
    dishes << {
      name: Faker::Food.dish,
      description: Faker::Food.description,
      price: Faker::Commerce.price(range: 5..50),
      restaurant_id: restaurant_id,
      created_at: Time.now,
      updated_at: Time.now
    }
  end

  # Insert Reviews and Comments
  REVIEWS_PER_RESTAURANT.times do
    review = {
      rating: rand(1..5),
      content: Faker::Lorem.sentence(word_count: 20),
      user_id: user_ids.sample,
      restaurant_id: restaurant_id,
      created_at: Time.now,
      updated_at: Time.now
    }
    reviews << review
  end
end
Dish.insert_all(dishes)
Review.insert_all(reviews)
review_ids = Review.pluck(:id)

review_ids.each do |review_id|
  COMMENTS_PER_REVIEW.times do
    comments << {
      content: Faker::Lorem.sentence(word_count: 10),
      user_id: user_ids.sample,
      review_id: review_id,
      created_at: Time.now,
      updated_at: Time.now
    }
  end
end
Comment.insert_all(comments)

restaurant_ids.each do |restaurant_id|
  PHOTOS_PER_RESTAURANT.times do |i|
    Photo.create!(
      primary: i == 0,
      restaurant_id: restaurant_id,
      image: File.open("./db/woodstock.webp"),
      created_at: Time.now,
      updated_at: Time.now
    )
  end
end

puts "Seeding completed!"