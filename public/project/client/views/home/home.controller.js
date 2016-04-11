(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, $location, LocationService, $sce, $http) {
        var vm = this;

        function init() {

        }
        init();


        vm.formatResponse = function(response) {
            var locations = {
                location: response[1]
            };

            return locations;
        };

        vm.search = search;
/*
        vm.searchAPI = function(userInput, timeoutPromise) {
            return $http.get({
                method: 'JSONP',
                url: "https://en.wikivoyage.org/w/api.php?action=opensearch&format=json&callback=callbackfn&search=".concat(userInput)
            }).then(function(data) {
                var locations = {
                    location: data[1]
                };

                return locations;
            });
        };*/

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
