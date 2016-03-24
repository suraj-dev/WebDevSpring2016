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
        vm.email = $rootScope.currentUser.email_id;
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
                email_id: usr.email
            };
            UserService
                .updateUser(id, user)
                .then(function (response) {
                    $rootScope.data = response;
                });
        }
    }
})();