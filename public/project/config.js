/**
 * Created by surajnagaraj on 3/1/16.
 */
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
                    templateUrl: "views/home/home.view.html"
                })
                .otherwise({
                    redirectTo: '/home'
                })
        });
})();

