(function(){
    'use strict';
    angular
        .module("TouristaApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when('/register', {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when('/login', {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when('/profile', {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when('/admin', {
                    templateUrl: "views/admin/admin.view.html"
                })
                .when('/home', {
                    templateUrl: "views/home/home.view.html",
                    controller: "SearchController"
                })
                .when('/details', {
                    templateUrl: "views/details/details.view.html",
                    controller: "DetailsController"
                })
                .otherwise({
                    redirectTo: '/home'
                })
        });
})();

