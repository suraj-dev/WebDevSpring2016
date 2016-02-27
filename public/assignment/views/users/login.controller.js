(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService, $location) {
        $scope.login = login;

        function login(){
            var user = UserService.findUserByUsernameAndPassword($scope.lgnusrname, $scope.lgnpasswd, function(response){
                $rootScope.data = response;
            });
            $rootScope.currentUser = user;
            if(user != null)
            $location.url('/profile');
            $scope.message = "Invalid credentials";
        }
    }
})();
