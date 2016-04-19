(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("SearchResultsController", SearchResultsController);

    function SearchResultsController($routeParams, LocationService, $rootScope) {
        function init() {
            var location_name = $routeParams.locationName;
            LocationService
                .findLocationByTitle(location_name)
                .then(function (response) {
                    console.log(response);
                    $rootScope.data = response.data;
                });
        }
        init();
    }
})();
