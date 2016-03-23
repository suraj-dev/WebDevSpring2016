(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, UserService, $location) {

        var vm = this;
        vm.register = register;
        var newUser;

        function register() {
            var user = {
                username: vm.username,
                password: vm.password,
                email_id: vm.email
            };

            UserService
                .createUser(user)
                .then(function(response) {
                    newUser = response.data[response.data.length - 1];
                    UserService.setCurrentUser(newUser);
                    $location.url("/profile");
            });



        }
    }
})();
