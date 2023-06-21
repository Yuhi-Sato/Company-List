Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :companies, only: [:index,:show,:create,:update,:destroy]
      resources :accounts, only: [:index,:show,:create,:update,:destroy]
      resources :memos, only: [:index,:create,:update,:destroy]
      mount_devise_token_auth_for 'User', at: 'auth'
    end
  end
end
