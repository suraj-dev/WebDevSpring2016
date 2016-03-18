(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, UserService, $location) {
        var vm = this;

        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            var usr = {
                username: user.username,
                password: user.password,
                email_id: user.email
            };

            UserService
                .createUser(usr)
                .then(function (response) {
                    var newUser = response.data;
                    console.log(newUser);
                    UserService.setCurrentUser(newUser[newUser.length - 1]);
                    $location.url("/profile");
                });

        }
    }
})();
