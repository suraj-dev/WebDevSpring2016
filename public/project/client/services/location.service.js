(function(){
    'use strict';
    angular
        .module("TouristaApp")
        .factory("LocationService", locationService);

    function locationService($http, $templateCache) {

        var comments = [];

        var service = {
            findLocationByTitle: findLocationByTitle,
            findLocationByID: findLocationByID,
            findTitleByID: findTitleByID,
            findComments: findComments,
            postComment: postComment,
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

        function findTitleByID(pageid, callback) {
            $http({
                method: 'JSONP',
                url: "http://wikitravel.org/wiki/en/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=info&pageids=" +  pageid,
                cache: $templateCache
            })
                .success(callback);
        }

        function findComments(locationId, callback) {
            var commentsForLocation = [];
            for (var com in comments) {
                if (comments[com].locationId === locationId)
                {
                    commentsForLocation.push(comments[com]);
                }
            }

            callback(commentsForLocation);
        }

        function postComment(comment, callback) {
            comments.push(comment);
            callback(comment);
        }

    }

})();