# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      # Specify the exact origin of your React frontend
      origins 'http://localhost:3001'
  
      # Define the resources and allowed methods/headers
      resource '/api/*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: true
    end
  end
  