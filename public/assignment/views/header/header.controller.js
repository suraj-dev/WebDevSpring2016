(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.$location = $location;
        $scope.logout = logout;

         function logout() {
         $rootScope.currentUser = null;
         $location.url("/home");
         }
    }
})();
