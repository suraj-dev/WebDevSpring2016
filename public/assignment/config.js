(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when('/register', {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when('/login', {
                    templateUrl: "views/users/login.view.html"
                })
                .when('/profile', {
                    templateUrl: "views/users/profile.view.html"
                })
                .when('/admin', {
                    templateUrl: "views/users/admin.view.html"
                })
                .when('/home', {
                    templateUrl: "views/home/home.view.html"
                })
                .when('/forms', {
                    templateUrl: "views/forms/forms.view.html"
                })
                .when('/profile', {
                    templateUrl: "views/users/profile.view.html"
                })
                .when('/admin', {
                    templateUrl: "views/admin/admin.view.html"
                })
                .when('/form-fields', {
                    templateUrl: "views/forms/form-fields.view.html"
                })
        });
})();
