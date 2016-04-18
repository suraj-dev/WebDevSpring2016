(function(){
    'use strict';
    angular
        .module("TouristaApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when('/register', {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs : "model"
                })
                .when('/login', {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when('/profile', {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs : "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/profile/:userId', {
                    templateUrl: "views/users/profile.readonly.view.html",
                    controller: "ProfileReadOnlyController",
                    controllerAs : "model"

                })
                .when('/admin', {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .when('/home', {
                    templateUrl: "views/home/home.view.html",
                    controller: "SearchController",
                    controllerAs : "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when('/details/:pageid', {
                    templateUrl: "views/details/details.view.html",
                    controller: "DetailsController",
                    controllerAs : "model"
                })
                .when('/searchresults', {
                    templateUrl: "views/searchresults/searchresults.view.html",
                    controller: "SearchResultsController"
                })
                .otherwise({
                    redirectTo: '/home'
                })
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            console.log(user[0]);
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user[0].roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user[0];
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user[0];
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user[0];
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();

