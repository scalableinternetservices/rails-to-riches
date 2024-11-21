Rails.application.routes.draw do
  namespace :api do
    post 'login', to: 'authentication#login'
    post 'signup', to: 'authentication#signup'
    resources :users
  end

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
