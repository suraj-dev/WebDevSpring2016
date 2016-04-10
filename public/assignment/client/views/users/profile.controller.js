(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {

        var vm = this;

        function init() {

            console.log($rootScope.currentUser);
            vm.username = $rootScope.currentUser.username;
            vm.password = $rootScope.currentUser.password;
            vm.email = $rootScope.currentUser.emails.toString();
            vm.firstName = $rootScope.currentUser.firstName;
            vm.lastName = $rootScope.currentUser.lastName;
        }
        init();

        vm.update = update;



        function update(usr) {
            var id = $rootScope.currentUser._id;
            var user = {
                username: usr.username,
                password: usr.password,
                firstName: usr.firstName,
                lastName: usr.lastName,
                emails: usr.email
            };
            UserService
                .updateUser(id, user)
                .then(function (response) {
                    console.log(response.data);
                    $rootScope.currentUser.username = response.data.username;
                    $rootScope.currentUser.password = response.data.password;
                    $rootScope.currentUser.emails = response.data.emails;
                    $rootScope.currentUser.firstName = response.data.firstName;
                    $rootScope.currentUser.lastName = response.data.lastName;
                });
        }
    }
})();