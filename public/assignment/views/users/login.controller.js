(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService, $location){
        $scope.login = function(){
            var user= UserService.findUserByUsernameAndPassword($scope.lgnusrname, $scope.lgnpasswd, function(response){
                $rootScope.data= response;
            });
            console.log(user);
            $rootScope.currentUser = user;
            $location.url('/profile');
        }
    }
})();
