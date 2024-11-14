Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :restaurants, only: [:create, :show]
      resources :users, only: [:create, :show]
      resources :profiles, only: [:show, :update]
      resources :posts do
        resources :comments, only: [:create, :index]
      end
      resources :messages, only: [:create, :index]
      post 'login', to: 'sessions#create'
      get 'logout', to: 'sessions#destroy'
    end
  end
end
