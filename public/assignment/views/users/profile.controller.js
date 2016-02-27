(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService){
        $scope.prfusrname = $rootScope.data.username;
        $scope.prfpasswd = $rootScope.data.password;
        $scope.prfemail = $rootScope.data.email_id;
        $scope.update = update;

        function update(){
            var id = $rootScope.data._id;
            var user = {
                username: $scope.prfusrname,
                password: $scope.prfpasswd,
                firstName: $scope.prffirstname,
                lastName: $scope.prflastname,
                email_id: $scope.prfemail
            };
            UserService.updateUser(id,user, function(response) {
                $rootScope.data= response;
            });
        }
    }
})();