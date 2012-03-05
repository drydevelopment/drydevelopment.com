DrydevelopmentCom::Application.routes.draw do
  match '/about' => 'pages#about', :as => 'about'
  match '/contact' => 'pages#contact', :as => 'contact'

  root :to => 'pages#home'
end
