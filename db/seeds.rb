# db/seeds.rb

# Clear existing data
User.destroy_all
Restaurant.destroy_all
Dish.destroy_all
Review.destroy_all
Comment.destroy_all
Photo.destroy_all

# Create Users
users = 5.times.map do |i|
  User.create!(
    name: "User #{i + 1}",
    email: "user#{i + 1}@example.com",
    password: "password",
    password_confirmation: "password",
    role: "business_owner"
  )
end

# Create Restaurants
users.each do |user|
  restaurants = 3.times.map do |i|
    Restaurant.create!(
      name: "Restaurant #{i + 1}",
      address: "123 Main St",
      city: "City #{i + 1}",
      state: "State #{i + 1}",
      zip: "12345",
      description: "A great place to eat.",
      phone_number: "123-456-7890",
      website: "http://restaurant#{i + 1}.com",
      user: user
    )
  end

  # Create Dishes, Reviews, Comments, and Photos for each Restaurant
  restaurants.each do |restaurant|
    # Create Dishes
    5.times do |i|
      Dish.create!(
        name: "Dish #{i + 1}",
        description: "Delicious dish #{i + 1}",
        price: (10 + i).to_f,
        restaurant: restaurant
      )
    end

    # Create Reviews
    3.times do |i|
      review = Review.create!(
        rating: rand(1..5),
        content: "Review content #{i + 1}",
        user: users.sample,
        restaurant: restaurant
      )

      # Create Comments for each Review
      2.times do |j|
        Comment.create!(
          content: "Comment content #{j + 1}",
          user: users.sample,
          review: review
        )
      end
    end

    # Create Photos
    2.times do |i|
      Photo.create!(
        image: File.open("./db/woodstock.webp"),
        primary: i == 0,
        restaurant: restaurant
      )
    end
  end
end

puts "Seeding completed!"
