(function () {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {

        var vm = this;

        function init() {
            vm.username = $rootScope.currentUser.username;
            vm.password = $rootScope.currentUser.password;
            vm.email = $rootScope.currentUser.emails.toString();
            vm.firstName = $rootScope.currentUser.firstName;
            vm.lastName = $rootScope.currentUser.lastName;
            vm.hometown = $rootScope.currentUser.hometown;
            vm.images = $rootScope.currentUser.images;
            vm.following = $rootScope.currentUser.following;
        }

        init();

        vm.update = update;

        function update() {
            var id = $rootScope.currentUser._id;
            var user = {
                username: vm.username,
                password: vm.password,
                firstName: vm.firstName,
                lastName: vm.lastName,
                emails: vm.email,
                hometown: vm.hometown,
                dob: vm.dob
            };
            UserService
                .updateUser(id, user)
                .then(function (response) {
                        console.log(response.data);
                        $rootScope.currentUser = response.data;
                        vm.updateMessage = "Profile has been updated";
                    },

                    function (err) {
                        vm.updateErrorMessage = "Error occurred while trying to update the profile";
                    });

        }
    }

})();