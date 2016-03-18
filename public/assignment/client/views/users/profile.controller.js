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

        vm.user.username = $rootScope.currentUser.username;
        vm.user.password = $rootScope.currentUser.password;
        vm.user.email = $rootScope.currentUser.email_id;
        vm.user.firstName = $rootScope.currentUser.firstName;
        vm.user.lastName = $rootScope.currentUser.lastName;

        /*this.model.update = update;*/



        function update(usr) {
            var id = $rootScope.data._id;
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