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
            postComment: postComment
        };

        return service;

        function findLocationByTitle(title) {
            return $http({
                method: 'JSONP',
                url: "http://wikitravel.org/wiki/en/api.php?action=query&format=json&callback=JSON_CALLBACK&list=allpages&apfrom=".concat(title),
                cache: $templateCache
            });
        }

        var page_id;
        function findLocationByID(id) {
            page_id = id;
            return $http({
                method: 'JSONP',
                url: "http://wikitravel.org/wiki/en/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=extracts%7Cimages&pageids=" + id,
                cache: $templateCache
            });

        }

        function findTitleByID(pageid) {
            return $http({
                method: 'JSONP',
                url: "http://wikitravel.org/wiki/en/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=info&pageids=" +  pageid,
                cache: $templateCache
            });
        }

        function findComments(locationId) {
            var commentsForLocation = [];
            for (var com in comments) {
                if (comments[com].locationId === locationId)
                {
                    commentsForLocation.push(comments[com]);
                }
            }

            return commentsForLocation;
        }

        function postComment(comment) {
            comments.push(comment);
            return comment;
        }

    }

})();