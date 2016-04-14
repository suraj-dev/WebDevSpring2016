(function () {
    'use strict';
    angular
        .module("TouristaApp")
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
                .findUserByCredentials(user.username, user.password)
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $rootScope.data = response.data;
                        console.log(response.data);
                        if ($rootScope.currentUser.roles !== null
                            && typeof($rootScope.currentUser.roles) !== 'undefined'
                            && $rootScope.currentUser.roles.indexOf('admin') >= 0) {
                            $location.url("/admin");
                        }
                        else {
                            $location.url("/profile");
                        }
                    }
                    else {
                        vm.message = "Invalid credentials";
                    }
                });
        }
    }
})();