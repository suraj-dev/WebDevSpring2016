(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $http, $templateCache, $rootScope, $location) {
        $scope.search = search;

        function search(location_name) {
            $http({method: 'JSONP',
                   url: "http://wikitravel.org/wiki/en/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=extracts&titles=".concat(location_name),
                   cache: $templateCache})
                .success(function(response) {
                    console.log(response);
                    $rootScope.data = response;
                    if($rootScope.data != null) {
                        $location.url('/details');
                    }
                });
        }
    }
})();
