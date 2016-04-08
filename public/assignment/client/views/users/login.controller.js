(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, UserService, $location) {
        var vm = this;

        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            if(!user) {
                return;
            }
            console.log(user);
            UserService
                .login(user)
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $rootScope.data = response.data;
                        console.log(response.data);
                        $location.url("/profile");
                    }
                    else {
                        vm.message = "Invalid credentials";
                    }
                });
        }
    }
})();
