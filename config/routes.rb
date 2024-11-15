Rails.application.routes.draw do
  namespace :api do
    resources :users, only: [:index, :show, :create, :update, :destroy]
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
