(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, UserService, $location) {

        var vm = this;
        vm.register = register;
        function register(user)
        {
            console.log(user);
            if(user.password != user.vrfpasswd || !user.password || !user.vrfpasswd)
            {
                vm.error = "Your passwords don't match";
            }
            else
            {
                UserService
                    .createUser(user)
                    .then(
                        function(response) {
                            console.log(response.data);
                            var user = response.data;
                            if(user != null) {
                                UserService.setCurrentUser(user);
                                console.log(user);
                                $location.url("/profile");
                            }
                        },
                        function(err) {
                            console.log(err);
                            vm.error = err;
                        }
                    );
            }
        }
    }
})();
