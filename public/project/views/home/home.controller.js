(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $rootScope, $location, LocationService) {
        $scope.search = search;

        function search(location_name) {
            LocationService.findLocationByTitle(location_name, function(response) {
                    console.log(response);
                    $rootScope.data = response;
                    if($rootScope.data != null) {
                        $location.url('/searchresults');
                    }
                });
        }
    }
})();
