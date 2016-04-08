(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {

        var vm = this;

        function init() {
        }
        init();

        vm.username = $rootScope.currentUser.username;
        vm.password = $rootScope.currentUser.password;
        vm.email = $rootScope.currentUser.emails[0];
        vm.firstName = $rootScope.currentUser.firstName;
        vm.lastName = $rootScope.currentUser.lastName;

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
                    $rootScope.currentUser.emails[0] = response.data.emails[0];
                    $rootScope.currentUser.firstName = response.data.firstName;
                    $rootScope.currentUser.lastName = response.data.lastName;
                });
        }
    }
})();