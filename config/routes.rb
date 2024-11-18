# config/routes.rb
Rails.application.routes.draw do
  match '*all', to: proc { [204, {}, ['']] }, via: :options
  namespace :api do
    post '/login', to: 'authentication#login'
    post '/signup', to: 'authentication#signup'
    get '/me', to: 'authentication#me'
    
    resources :users, only: [:index, :show, :update, :destroy]
    resources :restaurants do
      resources :reviews, only: [:index, :create]
      resources :photos, only: [:index, :create]
    end
    resources :reviews, only: [:show, :update, :destroy] do
      resources :comments, only: [:index, :create]
    end
    resources :comments, only: [:show, :update, :destroy]
    resources :photos, only: [:show, :destroy]
  end
end
