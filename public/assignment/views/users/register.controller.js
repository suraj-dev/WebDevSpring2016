(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService, $location){
        $scope.register= function () {
            var user= {
                username: $scope.usrname,
                password: $scope.inptpasswd,
                email_id: $scope.eml
            };

            var newUser = UserService.createUser(user, function(response){
                $rootScope.data=response;
            });
            $rootScope.currentUser = newUser;
            $location.path("profile.view.html");
        }
    }
})();
