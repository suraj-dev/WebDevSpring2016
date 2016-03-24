(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, UserService) {

        var vm = this;

        vm.$location = $location;
        vm.logout = logout;

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();

