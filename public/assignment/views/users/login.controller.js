(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService, $location){
        $scope.login = function(){
            UserService.findUserByUsernameAndPassword($scope.lgnusrname, $scope.lgnpasswd, function(response){
                $rootScope.data= response;
            });
            $location.path("profile.view.html");
        }
    }
})();
