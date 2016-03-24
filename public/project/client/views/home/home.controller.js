(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, $location, LocationService) {
        var vm = this;

        vm.search = search;

        function search(location_name) {
            LocationService
                .findLocationByTitle(location_name)
                .then(function(response) {
                    console.log(response);
                    $rootScope.data = response.data;
                    if($rootScope.data != null) {
                        $location.url('/searchresults');
                    }
                });
        }
    }
})();
