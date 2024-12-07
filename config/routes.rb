# config/routes.rb
Rails.application.routes.draw do
  match '*all', to: proc { [204, {}, ['']] }, via: :options
  namespace :api do
    post '/login', to: 'authentication#login'
    post '/signup', to: 'authentication#signup'
    get '/me', to: 'authentication#me'
    get '/restaurants_paged', to: 'restaurants#paged_index'
    
    resources :users, only: [:index, :show, :update, :destroy]
    resources :restaurants do
      resources :reviews, only: [:index, :create] do
        resources :comments, only: [:index, :create]
        get 'comments_paged', to: 'comments#paged_index'
      end
      get 'reviews_paged', to: 'reviews#paged_index'
      resources :photos, only: [:index, :create]
      get 'primary_photo', to: 'photos#primary_photo'
      resources :dishes, only: [:index, :create]
    end
    resources :reviews, only: [:show, :update, :destroy]
    resources :comments, only: [:show, :update, :destroy]
    resources :photos, only: [:show, :update, :destroy]
    resources :dishes, only: [:show, :update, :destroy]
  end
end
