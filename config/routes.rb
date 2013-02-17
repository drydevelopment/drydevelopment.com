DrydevelopmentCom::Application.routes.draw do
  match '/about' => 'pages#about', :as => 'about'
  match '/contact' => 'pages#contact', :as => 'contact'

  # TODO: Remove after the wedding
  match '/wedding' => 'pages#wedding', :as => 'wedding'

  root :to => 'pages#home'
end
