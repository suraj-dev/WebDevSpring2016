(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("MainController", MainController);

    function MainController($scope, $location)
    {
        $scope.$location = $location;
    }
})();
