(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {

        var vm = this;

        vm.username = $rootScope.currentUser.username;
        vm.password = $rootScope.currentUser.password;
        vm.email = $rootScope.currentUser.email_id;
        vm.firstName = $rootScope.currentUser.firstName;
        vm.lastName = $rootScope.currentUser.lastName;
        vm.hometown = $rootScope.currentUser.hometown;
        vm.dob = $rootScope.currentUser.dob;
        vm.update = update;

        function update() {
            var id = $rootScope.data._id;
            var user = {
                username: vm.username,
                password: vm.password,
                firstName: vm.firstName,
                lastName: vm.lastName,
                email_id: vm.email,
                hometown: vm.hometown,
                dob: vm.dob
            };
            UserService
                .updateUser(id,user)
                .then(function(response) {
                $rootScope.data= response.data;
            });
        }
    }
})();