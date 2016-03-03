(function(){
    'use strict';
    angular
        .module("TouristaApp")
        .factory("LocationService", locationService);

    function locationService($http, $templateCache) {

        var service = {
            findLocationByTitle: findLocationByTitle,
            findLocationByID: findLocationByID,
           /* imageProvider: imageProvider,*/
            findTitleByID : findTitleByID
        };

        return service;

        function findLocationByTitle(title, callback) {
            $http({
                method: 'JSONP',
                url: "http://wikitravel.org/wiki/en/api.php?action=query&format=json&callback=JSON_CALLBACK&list=allpages&apfrom=".concat(title),
                cache: $templateCache
            })
                .success(callback);
        }

        var page_id;
        function findLocationByID(id, callback) {
            $http({
                method: 'JSONP',
                url: "http://wikitravel.org/wiki/en/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=extracts%7Cimages&pageids=" + id,
                cache: $templateCache
            })
                .success(callback);
            page_id = id;
        }

        /*function imageProvider(callback) {
            $http({
                method: 'JSONP',
                url: "http://wikitravel.org/wiki/en/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=imageinfo&pageids=" +  page_id +"&generator=images&redirects=1&iiprop=url",
                cache: $templateCache
            })
                .success(callback);
        }*/

        function findTitleByID(pageid, callback) {
            $http({
                method: 'JSONP',
                url: "http://wikitravel.org/wiki/en/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=info&pageids=" +  pageid,
                cache: $templateCache
            })
                .success(callback);
        }


    }
})();