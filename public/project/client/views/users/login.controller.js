(function () {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, UserService, $location) {
        var vm = this;

        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            if(!user) {
                return;
            }
            console.log(user);
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $rootScope.data = response.data;
                        console.log(response.data);
                        $location.url("/profile");
                    }
                    else {
                        vm.message = "Invalid credentials";
                    }
                });
        }
    }
})();


/*
(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService, $location) {
        $scope.login = login;
        var user;

        function login(){
            user = UserService.findUserByCredentials($scope.lgnusrname, $scope.lgnpasswd, function(response){
                $rootScope.data = response;
            });
            UserService.setCurrentUser(user);
            if (user != null) {
                if ($rootScope.currentUser.roles.indexOf('admin') >= 0) {
                    $location.url('/admin');
                }
                else
                    $location.url('/profile');
            }
            else
                $scope.message = "Invalid credentials";
        }
    }
})();
*/
