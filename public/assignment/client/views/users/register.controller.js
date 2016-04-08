(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;

        vm.register = register;

        function init() {

        }
        init();

        function register(user)
        {
            if(user.password != user.verifyPassword || !user.password || !user.verifyPassword)
            {
                vm.error = "Your passwords don't match";
            }
            else
            {
                UserService
                    .register(user)
                    .then(
                        function(response) {
                            console.log(response.data);
                            var user = response.data;
                            if(user != null) {
                                UserService.setCurrentUser(user);
                                $location.url("/profile");
                            }
                        },
                        function(err) {
                            vm.error = err;
                        }
                    );
            }
        }
    }
})();
