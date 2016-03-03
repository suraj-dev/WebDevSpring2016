(function(){
    'use strict';
    angular
        .module("TouristaApp")
        .factory("LocationService", locationService);

    function locationService($http, $templateCache) {

        var service = {
            findLocationByTitle : findLocationByTitle,
            findLocationByID: findLocationByID
        };

        return service;

        function findLocationByTitle(title, callback) {
            $http({method: 'JSONP',
                url: "http://wikitravel.org/wiki/en/api.php?action=query&format=json&callback=JSON_CALLBACK&list=allpages&apfrom=".concat(title),
                cache: $templateCache})
                .success(callback);
        }

        function findLocationByID(id, callback) {
            $http({method: 'JSONP',
                url: "http://wikitravel.org/wiki/en/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=extracts&pageids=" + id,
                cache: $templateCache})
                .success(callback);
        }
    }
})();