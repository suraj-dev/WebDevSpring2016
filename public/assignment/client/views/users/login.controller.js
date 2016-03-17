(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService, $location) {
        $scope.login = login;

        function login(){
            var user = UserService.findUserByCredentials($scope.lgnusrname, $scope.lgnpasswd, function(response){
                $rootScope.data = response;
            });
            $rootScope.currentUser = user;
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
